import { useNotificationStore } from '../stores/notifications.module'

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimer: number | null = null;

  connect(token: string) {
    if (this.ws) {
      this.ws.close();
    }

    const baseHost = import.meta.env.VITE_BASE_API_URL?.replace(/^http/, 'ws') || 'ws://localhost:3001/api/';
    const wsUrl = `${baseHost}ws?token=${token}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WS message received:', data);
        
        // Since we only send notifications for now, we can just push it to the store.
        const notificationStore = useNotificationStore();
        notificationStore.addNotification(data);
      } catch (e) {
        console.error('Failed to parse WS message:', e);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected. Reconnecting in 5s...');
      this.reconnectTimer = setTimeout(() => this.connect(token), 5000) as any;
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.ws?.close(); // Triggers onclose to reconnect
    };
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.onclose = null; // Prevent auto-reconnect
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsService = new WebSocketService();
