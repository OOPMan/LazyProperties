import lazy from '../src/lazyproperties';
import test from 'unit.js';

describe('lazy', function () {
   it('should be a function', function () {
       test.function(lazy);
   });

   it('which creates lazy getters on objects', function () {
       var counter = 0;
       let o = lazy(
           {},
           function () {
               counter += 1;
               return {
                   testValue: true,
                   testFunction: function () {
                       return true;
                   }
               }
           },
           'testValue',
           'testFunction'
       );

       test.object(o)
           .hasProperty('testValue')
           .isEnumerable('testValue')
           .hasProperty('testFunction')
           .isEnumerable('testFunction');

       test.bool(o.testValue).isTrue();
       test.function(o.testFunction);
       test.bool(o.testFunction()).isTrue();
       test.number(counter).is(1);
   });
});