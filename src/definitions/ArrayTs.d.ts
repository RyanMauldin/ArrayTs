/**
 * Created by Jack on 6/29/2014.
 * Updated by Ryan Mauldin on 3/14/2020.
 *  * interface Array<T> became a repetitively outdated definition,
 *  * and has been removed and replaced by IArray<T> class instead,
 *  * replacing the need of the prototype method which can cause,
 *  * interfacing collisions with other libraries using prototype.
 */

 //... old prototype interface from ArrayJs (2013) - https://github.com/EmptyCubes/Array.js
// interface Array<T> {
//   Aggregate(func: Function, seed?: T): T;
//   All(predicate?: Function): boolean;
//   ... (see more under original source) ...
// }
