import test from 'tape';
import gg from '../src/index';

test('can emit an event', function (t) {
    var e = new gg();
    t.doesNotThrow(() => {
      e.emit('foo');
      t.end();
    });
});

test('suscriber gets called when event fires', function (t) {
    var e = new gg();
    var count = 0;
    e.on('foo', () => {
      count++;
    });
    e.emit('foo');

    t.equal(count, 1);
    t.end();    
});



test('multiple subscriber get called', function (t) {
    var e = new gg();
    var count = 0;
    
    e.on('foo', () => {
      count++;
    });
    
    var other = 0;
    e.on('foo', () => {
      other++;
    })
    e.emit('foo');

    t.equal(count, 1);
    t.equal(other, 1);
    t.end();    
});

test('subscribers get called in the order they were registered', function (t) {
    var e = new gg();
    var count = 0;
    
    e.on('foo', () => {
      t.equal(count, 0);
      count++;
    });
    
    e.on('foo', () => {
      t.equal(count, 1);
      count++;
    })
    
    e.emit('foo');

    t.equal(count, 2);
    t.end();    
});

test('suscriber doesnt get called for different event', function (t) {
    var e = new gg();
    var count = 0;
    e.on('bar', () => {
      count++;
    });
    e.emit('foo');
    t.equal(count, 0);
    t.end();
});

test('suscriber doesnt get called after unsuscribing', function (t) {
    var e = new gg();
    var count = 0;
    var suscriber = () => { count++};
    e.on('bar', suscriber);
    e.emit('bar');
    t.equal(count, 1);
    e.off('bar', suscriber);
    e.emit('bar');
    t.equal(count, 1);
    t.end();
});

test('can suscribe once to an event', function (t) {
    var e = new gg();
    var count = 0;
    var suscriber = () => { count++};
    e.once('bar', suscriber);
    e.emit('bar');
    e.emit('bar');
    t.equal(count, 1);
    t.end();
});
