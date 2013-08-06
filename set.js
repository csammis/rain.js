// Set implementation from http://matt.stumpnet.net/
function Set(name) {
    var setName = name, index = 0, count = 0;

    this.size = function() {
        return count;
    };

    this.add = function(item) {
        if (this.contains(item)) {
            return;
        }
        item[setName] = index;
        this[index] = item;
        index++;
        count++;
    };

    this.remove = function(item) {
        if (!this.contains(item)) {
            return;
        }
        delete this[item[setName]];
        delete item[setName];
        count--;
    };

    this.clear = function() {
        for (var p in this) {
            if (this.contains(this[p])) {
                this.remove(this[p]);
            }
            index = 0;
        }
    };

    this.contains = function(item) {
        return item.hasOwnProperty(setName)
                && this.hasOwnProperty(item[setName])
                && item === this[item[setName]];
    };
};

