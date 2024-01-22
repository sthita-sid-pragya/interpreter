/**
 * AST Transformer.
 */
class Transformer
{
    /**
     * Translates `def` -expression (function declaration)
     * into a variable declaration with a lambda
     * expression.
     */

    transformDefToVarLambda(defExp)
    {
        const [_tag, name, params, body] = defExp;
        return ['var', name, ['lambda', params, body]];
    }

    /**
     * Transforms `switch` to nested `if` -expressions.
     */
     transformSwitchToIf(switchExp)
     {
         const [_tag, ...cases] = switchExp;

         const ifExp = ['if', null, null, null];

         let current = ifExp;

         for(let i = 0; i < cases.length - 1; i++)
         {
             const [currentCond, currentBlock] = cases[i];

             current[1] = currentCond;
             current[2] = currentBlock;

             const next = cases[i + 1];
             const [nextCond, nextBlock] = next;

             current[3] = nextCond === 'else'
              ? nextBlock
              : ['if']; 

             current = current[3];
         }

         return ifExp; 
     }

     transformForToWhile(forExp)
     {
         const [_tag, ...cases] = forExp;

         const whileExp = ['while', null, null, null];

         let current = whileExp;

         for(let i = 0; i < cases.length - 1; i++)
         {
             const [currentCond, currentBlock] = cases[i];

             current[1] = currentCond;
             current[2] = currentBlock;

             const next = cases[i + 1];
             const [nextCond, nextBlock] = next;

            //  current[3] = nextCond === 'else'
            //   ? nextBlock
            //   : ['while']; 

             current = current[3];
         }

         return whileExp; 
     }

     /**
   * Transforms `++ foo` to (set foo (+ foo 1))
   */
  transformIncToSet(incExp) {
    const [_tag, exp] = incExp;
    return ['set', exp, ['+', exp, 1]];
  }

  /**
   * Transforms `-- foo` to (set foo (- foo 1))
   */
  transformDecToSet(incExp) {
    const [_tag, exp] = incExp;
    return ['set', exp, ['-', exp, 1]];
  }

  /**
   * Transforms `+= foo val` to (set foo (+ foo val))
   */
  transformIncValToSet(incExp) {
    const [_tag, exp, val] = incExp;
    return ['set', exp, ['+', exp, val]];
  }

  /**
   * Transforms `+= foo val` to (set foo (+ foo val))
   */
  transformDecValToSet(incExp) {
    const [_tag, exp, val] = incExp;
    return ['set', exp, ['-', exp, val]];
  }



}

module.exports = Transformer;