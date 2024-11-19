class Asset {
    constructor(data) {
        this.id = data.id || Date.now();
        this.name = data.name;
        this.category = data.category;
        this.purchaseDate = data.purchaseDate;
        this.cost = data.cost;
        this.condition = data.condition;
        this.location = data.location;
        this.assignedTo = data.assignedTo || null;
        this.maintenanceHistory = data.maintenanceHistory || [];
    }

    static create(data) {
        const asset = new Asset(data);
        db.assets.push(asset);
        db.save();
        return asset;
    }

    addMaintenanceRecord(record) {
        this.maintenanceHistory.push({
            date: new Date().toISOString(),
            description: record.description,
            cost: record.cost,
            performedBy: record.performedBy
        });
        db.save();
    }

    static getAssetsByCategory(category) {
        return db.assets.filter(a => a.category === category);
    }
}