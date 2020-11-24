class Storage {

  constructor(prefix) {
    this.prefix = prefix || '';
  }

  setPrefix (prefix) {
    this.prefix = prefix;
  }

  pushKey (key) {
    if (this.prefix) {
      const keys = this.getItem('_keys') || [];
      keys.push(key);
      this.setItem('_keys', keys);
    }
  }

  getItem (key) {
    const value = localStorage.getItem(`${this.prefix}${key}`);
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }

  setItem (key, value) {
    this.pushKey(key);
    localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
  }

  clearItem (key) {
    localStorage.clearItem(`${this.prefix}${key}`);
  }

  clearAllByPrefix () {
    const keys = this.getItem('_keys') || [];
    keys.forEach(key => this.clearItem(keys));
  }

  clearAll () {
    if (this.prefix) {
      this.clearAllByPrefix();
    } else {
      localStorage.clear();
    }
  }

}

export default new Storage();
