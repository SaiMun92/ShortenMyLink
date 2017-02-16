//collections is a data storage system in Meteor
// Any code within the imports directory is not loaded automatically. It must be loaded explicitly
import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';    // the 'check' is to check the types and structures of variables



// A remote precedural call system to write to the database,
// used to save user input events and data that come from the client.
Meteor.methods({
  'links.insert':function(url) {
    //validUrl.isUri(url);  // returns undefined if its not a url
    check(url, Match.Where(url => validUrl.isUri(url)));    // where(condition) => returns true if it matches condition

    // we're ready tos ave the url
    // getting a random string of 5 characters[a-z0-9]
    const token = Math.random().toString(36).slice(-5);
    Links.insert({ url, token, clicks: 0});
    // url: url,
    // token: token,
    // click: 0
  }
});
export const Links = new Mongo.Collection('links');
