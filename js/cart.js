(function (global) {
  var KEY = "mindperfume-cart-v1";

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return { items: [] };
      var data = JSON.parse(raw);
      if (!data.items || !Array.isArray(data.items)) return { items: [] };
      return data;
    } catch (e) {
      return { items: [] };
    }
  }

  function write(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function add(productId, qty) {
    var data = read();
    var q = Math.max(1, parseInt(qty, 10) || 1);
    var idx = data.items.findIndex(function (x) {
      return x.id === productId;
    });
    if (idx >= 0) data.items[idx].qty += q;
    else data.items.push({ id: productId, qty: q });
    write(data);
    return data.items;
  }

  function setQty(productId, qty) {
    var data = read();
    var q = parseInt(qty, 10);
    var idx = data.items.findIndex(function (x) {
      return x.id === productId;
    });
    if (idx < 0) return data.items;
    if (!q || q < 1) data.items.splice(idx, 1);
    else data.items[idx].qty = q;
    write(data);
    return data.items;
  }

  function remove(productId) {
    var data = read();
    data.items = data.items.filter(function (x) {
      return x.id !== productId;
    });
    write(data);
    return data.items;
  }

  function clear() {
    write({ items: [] });
  }

  function getItems() {
    return read().items;
  }

  function countUnits() {
    return read().items.reduce(function (sum, line) {
      return sum + line.qty;
    }, 0);
  }

  global.MindCart = {
    read: read,
    add: add,
    setQty: setQty,
    remove: remove,
    clear: clear,
    getItems: getItems,
    countUnits: countUnits,
  };
})(window);
