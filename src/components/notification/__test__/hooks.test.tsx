import io from 'socket.io-client';
import { useNotifications } from '../hooks';
import { Mock, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';

vi.mock('socket.io-client');

it('updates notification count when receiving new notifications', async () => {
  const mockSocket = {
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
  };
  (io as Mock).mockReturnValue(mockSocket);
  const TestComponent = () => {
    const { count } = useNotifications();
    return <p data-testid="test">{count}</p>;
  };
  render(<TestComponent />);
  const joinedData = { msg: 'Joined Mocking' };
  const newNotification: { read: boolean } = { read: false };
  const notificationMockData = [{ read: false }];
  act(() => {
    (mockSocket.on as Mock).mock.calls[0][1](joinedData);
    (mockSocket.on as Mock).mock.calls[1][1](notificationMockData);
    (mockSocket.on as Mock).mock.calls[2][1](newNotification);
  });
  expect(screen.getByTestId('test')).toBeInTheDocument();
});
