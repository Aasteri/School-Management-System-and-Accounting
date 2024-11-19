// Browser-based notification system
export class NotificationService {
    static async notify(options) {
        const { title, message, type = 'info' } = options;
        
        // Check if browser notifications are supported and permitted
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification(title, { body: message });
            } else if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    new Notification(title, { body: message });
                }
            }
        }
        
        // Fallback to in-app notifications
        this.showInAppNotification(title, message, type);
    }

    static showInAppNotification(title, message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <h4>${title}</h4>
            <p>${message}</p>
        `;

        const container = document.getElementById('notificationContainer') || this.createNotificationContainer();
        container.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    static createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        document.body.appendChild(container);
        return container;
    }
}