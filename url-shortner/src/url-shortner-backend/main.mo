import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor URLShortener {
  stable var urls : [(Text, Text)] = [];

  public shared func shorten(originalUrl : Text) : async Text {
    let shortCode = Nat.toText(urls.size());
    urls := Array.append(urls, [(shortCode, originalUrl)]);
    return shortCode
  };

  public query func resolve(shortCode : Text) : async ?Text {
    for ((sc, originalUrl) in urls.vals()) {
      if (sc == shortCode) {
        return ?originalUrl
      }
    };
    return null
  }
}
