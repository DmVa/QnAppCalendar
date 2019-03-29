class Stage {
    constructor(id, name, statuses) {
        this.id = id;
        this.name = name;
        this.statuses = [];
        if (statuses) {
            this.statuses = statuses;
        }
    }
}

class Status {

    constructor(id, name, isQflow) {
        this.id = id;
        this.name = name;
        this.isQflow = isQflow;
        this.stageId = -1;
    }
}