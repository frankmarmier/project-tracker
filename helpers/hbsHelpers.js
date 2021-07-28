const hbs = require("hbs");

/**
 *
 *  When you register partials, if you use the options
 * parameter, eg: options.fn(this).
 * DO NOT create a fat arrow function otherwise you will
 * loose the value of this
 *
 */

hbs.registerHelper("includesId", function (param1, param2, options) {
  /**
   * Whilst in the backend, after retrieving a document
   * from the Database, ObjectId's might print out
   * as strings but they are actually ObjectIds.
   * We need to turn them into a string in order
   * to compare ObjectId's between each other.
   *
   * This function converts an objectId into a string
   * and an array of objectId's into an array of strings
   * and looks if the stringified objectId is inculded
   * in the array of stringified objectId's.
   *
   *  When creating helpers you will receive an additional
   *   provided by hbs,
   * return  options.fn(this) => return the truthy block
   * return option.inverse(this) => return the falsy block
   *
   *
   *
   * eg:   {{#includesId}}
   *                this is the truthy block
   *            <div></div>
   *        {{/else}}
   *              this is the falsy block
   *          <div></div>
   *        {{/includesId}}
   */

  const stringifiedParam1 = param1.toString();
  const stringifiedArr = param2.map((id) => id.toString());

  if (stringifiedArr.includes(stringifiedParam1)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("compare", function (value1, operator, value2, options) {
  /**
   *    HOW TO USE : 
         {{#compare "foo" "===" "foo"}}
                <div>Hello</div>
            {{else}}
                 <div>bar</div>
         {{/compare}}
    */

  const operatorFunctions = {
    "<": (v1, v2) => v1 < v2,
    "<=": (v1, v2) => v1 <= v2,
    ">": (v1, v2) => v1 > v2,
    ">=": (v1, v2) => v1 >= v2,
    "===": (v1, v2) => v1 === v2,
    "==": (v1, v2) => v1 == v2,
    "!==": (v1, v2) => v1 !== v2,
    "!=": (v1, v2) => v1 != v2,
  };

  /**
   * Throw an error to the developer to warn the developer :D
   */
  if (!Object.keys(operatorFunctions).includes(operator)) {
    throw new Error(
      `Operator parameter must be one of ${Object.keys(operatorFunctions).join(
        " or "
      )}`
    );
  }

  const operatorFn = operatorFunctions[operator];

  const isTrue = operatorFn(value1, value2);

  if (isTrue) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("ternary", (condition, value1, value2) => {
  /**     In your templates
   *     {{ternary false "yay" "nay"}}
   *
   *    outputs => nay
   *
   *   {{ternary true "yay" "nay"}}
   *    outputs => nay
   */
  return condition ? value1 : value2;
});
