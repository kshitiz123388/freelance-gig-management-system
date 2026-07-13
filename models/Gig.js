class Gig {

    static gigs = [];

    // Get all gigs
    static getAll() {
        return this.gigs;
    }

    // Get gig by id
    static getById(id) {
        return this.gigs.find(gig => gig.id === id);
    }

    // Add new gig
    static create(data, userId) {

        const newGig = {
            id: Date.now().toString(),
            title: data.title,
            clientName: data.clientName,
            budget: Number(data.budget),
            status: data.status,
            userId: userId
        };

        this.gigs.push(newGig);

        return newGig;
    }

    // Update gig
    static update(id, data) {

        const gig = this.getById(id);

        if (!gig) {
            return null;
        }

        gig.title = data.title;
        gig.clientName = data.clientName;
        gig.budget = Number(data.budget);
        gig.status = data.status;

        return gig;
    }

    // Delete gig
    static delete(id) {

        const index = this.gigs.findIndex(gig => gig.id === id);

        if (index === -1) {
            return false;
        }

        this.gigs.splice(index, 1);

        return true;
    }

}

module.exports = Gig;