const assert = require('assert');
const testUtil = require('./test-util');

module.exports = eva =>
{
 //Blocks:

assert.strictEqual(eva.eval(
    ['begin',
   
       ['var', 'x', 10],
       ['var', 'y', 20],
   
       ['+', ['*', 'x', 'y'], 30],
   ]),
   
   
   230);
   
   assert.strictEqual(eva.eval(// evaluating block in its own environment
       ['begin',
      
          ['var', 'x', 10],
          ['begin',
      
               ['var', 'x', 20],
               'x'
   
           ],
   
           'x'
      ]),
   
      10);
   
   assert.strictEqual(eva.eval(// evaluating block in its own environment
       ['begin',
     
         ['var', 'value', 10],
         ['var', 'result', ['begin',
     
              ['var', 'x', ['+', 'value', 10]],
              'x'
   
          ]],
   
          'result'
     ]),
   
     20);
   
     //Assignment represented as set instruction
   
   assert.strictEqual(eva.eval(// evaluating block in its own environment
     ['begin',
   
       ['var', 'data', 10],
       ['begin',
   
            ['set', 'data', 100],
   
   
        ],
   
        'data'
   ]),
   
   100);

  //   // S-expression format
    testUtil.test(eva,`
    (begin
       (var x 10)
       (var y 20)
       (+ (* x 10) y))
         
    `,
    120);
};