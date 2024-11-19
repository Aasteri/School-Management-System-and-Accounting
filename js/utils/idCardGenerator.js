// ID Card generation utility
const idCardGenerator = {
    async generateCard(user, template) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size for ID card (standard credit card size ratio)
        canvas.width = 1012;
        canvas.height = 638;
        
        // Draw background
        ctx.fillStyle = template.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add school logo
        const logo = await this.loadImage('/assets/logo.png');
        ctx.drawImage(logo, 50, 50, 100, 100);
        
        // Add user photo
        const photo = await this.loadImage(user.profilePic);
        ctx.drawImage(photo, 50, 200, 200, 200);
        
        // Add text fields
        ctx.fillStyle = '#fff';
        ctx.font = '24px Arial';
        
        let y = 200;
        template.fields.forEach((field, index) => {
            ctx.fillText(`${field}: ${user[field]}`, 300, y + (index * 40));
        });
        
        return canvas.toDataURL('image/png');
    },
    
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }
};