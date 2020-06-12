const memjs = require('memjs');
/**
 * Helper class for using Memcache
 * 
 * @author Moshe Rasetsoke
 * @version 0.1
 */
class MemcachedFactory {

    constructor() {
      this.client = memjs.Client.create(process.env.MEMCACHIER_SERVERS);
    }

    /**
     * returns a single instance of the class
     */
    static getInstance() {
      if (this.instance == null) {
        this.instance = new MemcachedFactory();
      }
      return this.instance;
    }

    /**
     * stores a value in memcache
     * @param {string} key 
     *  the key used
     * @param {*} value
     *  the value to store
     * @param {number} ttl 
     *  time-to-live in seconds
     */
    set(key, value, ttl) {
      this.client.set(key, value, { expires: ttl }, err => {
        if (err) {
          console.log(err);
          throw err;
        }
      });
    }
    /**
     * gets a value from memcache
     * 
     * @param {string} key 
     *  the key used
     * @param {function} callback
     *  the callback containing the value
     */
    get(key, callback) {
      this.client.get(key, (err, value) => {
        if (err) {
          console.error(err);
          callback(err);
        }
        if (value == null) {
          callback(err, null);
        } else {
          callback(err, value.toString());
        }
      });
  }
}
module.exports = MemcachedFactory;