# ArrayTs

***Important Notice: [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) library is in Beta mode being actively developed. **Unit Testing** for [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) is now underway. If a production quality code version must be used, please refer to the previous [**`JavaScript`**](https://www.javascript.com/) library version [**`ArrayJs`**](https://github.com/EmptyCubes/Array.js). This notice will be removed, when all offered [**`IEnumerable<T>`**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8) type methods gain code coverage, and implement proper error handling techniques.***

[**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) is a [**`TypeScript`**](http://www.typescriptlang.org/) *library*
which ***enhances*** the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
*type* by ***exposing*** *extension methods*, ***similar*** to the [**`IEnumerable<T>`**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
*interface* in [**`Microsoft's`**](https://www.microsoft.com/en-us/) [**`.NET Core`**](https://docs.microsoft.com/en-us/dotnet/core/)
*framework*. The ***generic*** [**`Array<T>`**](https://www.typescriptlang.org/docs/handbook/generics.html) *interface* is
being ***extended*** for the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *implementation* of the
[**`IEnumerable<T>`**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
*interface* features, ***exposed*** to the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
*type*.

**Roadmap:**

>**1. Universal Module Definition (UMD):** *Desire* to **refactor** the **`ts`** namespace* **partially/fully** *out*
> of the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *project codebase*, in *favor* of *adopting* a
> [**`UMD`**](https://github.com/umdjs/umd) *modular based* **design approach**. To *ensure* the **final** *transpiled/compiled*
> [**`JavaScript`**](https://www.javascript.com/) *module definitions* are **accurate**, adding *additional* *build tools*
> to the **`build workflow`** is *now* **necessary**, *e.g.* [Browserify](http://browserify.org/) & [Tsify](https://www.npmjs.com/package/tsify).
> Using a [**`UMD`**](https://github.com/umdjs/umd), *modular based* **design approach**, for [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs),
> *provides* a **superior method**, for *avoiding* **naming collisions** with *all other* [**`npm`**](https://www.npmjs.com/)
> *packages*, *duplicate namespaces* or *user-defined codebases*.
>
>**2. Browserify / **Tsify**:** *Desire* to **implement** [Browserify](http://browserify.org/) & [tsify](https://www.npmjs.com/package/tsify).
>
>**3. Unit Testing - Positive:** *Desire* to *flush out* & *fix* current **bugs** with [**`Happy Path`**](https://en.wikipedia.org/wiki/Happy_path)
> *paradigm* in *mind*, *e.g.* **`InnerJoin()`** does **not** work.
>
>*4. Error/Throw Logic Refactor:** *Desire* to **refactor** *logic lines* that *contain* **`throw new Error("...")`**
> style *logic implementations* in *favor* of a *response style* **continuation** or **observation** much like that of
> [**`neverthrow`**](https://github.com/gdelgado14/neverthrow#top-level-api), as mentioned in the
> [**`neverthrow dev.to`**](https://dev.to/_gdelgado/type-safe-error-handling-in-typescript-1p4n) *article*.
>
>**5. Unit Testing - Negative:** *Desire* to *flush out* **new bugs** by *trying* to *use* **failure cases**.
>
>**6. Code Documentation Updates:** *Desire* to *finish* **documentation** and **code comments** for **every** *method*,
> *interface* and *readme*.
>
>**7. [**`npm`**](https://www.npmjs.com/) Package:** *Desire* to *create* the [**`npm`**](https://www.npmjs.com/) package
> **array-ts** to *deploy* **package code** to [**`npm`**](https://www.npmjs.com/) in an *automated fashion*.
>
>**8. Create Documentation Site:** *Desire* to *create* a **Documentation Website** to help **others** *easily understand*
> and *implement* [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs).

**Known Issues:**

***03/24/2020:*** [**`Ryan Mauldin`**](https://github.com/ryanmauldin) *discovered* issue with **InnerJoin()** when running
[**`index.html`**](https://github.com/RyanMauldin/ArrayTs/blob/master/index.html).

***See [**`TypeScript`**](http://www.typescriptlang.org/) usage:***

[**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *library* includes *some functionality* **beyond** the [**`IEnumerable<T>`**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
*interface* as well, such as the **`Clone()`** *method* as *shown below*, which *offers* a **Deep Cloning** *capability*
to the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp).

**[**`TypeScript`**](http://www.typescriptlang.org/) code:**

```typescript
const numbers: Array<number> = [ 1, 2, 3, 4 ];
let clonedNumbers: ts.IArray<number> = new ts.IArray<number>();
if (!ts.IsNullOrEmpty(numbers)) clonedNumbers = (<ts.IArray<number>>numbers).Clone();
console.log("Cloned Numbers Greater Than 2:");
for (const number of clonedNumbers.Where(p => p > 2)) { console.log(number); }
```

**[**`TypeScript`**](http://www.typescriptlang.org/) output:**

>Cloned Numbers Greater Than 2:
>
>3
>
>4

***See [**`JavaScript`**](https://www.javascript.com/) usage:***

[**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *library* includes a set of *functional* **use-case scenarios**,
**implemented** in [**`index.html`**](https://github.com/RyanMauldin/ArrayTs/blob/master/index.html), which follow the
[**`Happy Path`**](https://en.wikipedia.org/wiki/Happy_path) *paradigm*. The *following code* shows *how-to access* the
**ts namespace** from [**`JavaScript`**](https://www.javascript.com/) code. See [**`index.html`**](https://github.com/RyanMauldin/ArrayTs/blob/master/index.html),
for the full working example.

**[**`JavaScript`**](https://www.javascript.com/) code:**

```javascript
<html xmlns="http://www.w3.org/1999/xhtml">
  <head><script src="./ArrayTs.js"></script></head>
  <body>
    <script type="text/javascript">
      function ready(fn) {
        // ... see index.html for implementation ...
      }
      ready(function() {
        var output = document.getElementById("output");
        var log = new ts.IArray();

        var source = new ts.IArray([
          { Id: 1, Name: "Item 1" },
          { Id: 2, Name: "Item 2" },
          { Id: 3, Name: "Item 3" },
          { Id: 4, Name: "Item 4" },
          { Id: 5, Name: "Item 5" },
          { Id: 6, Name: "Item 6" },
          { Id: 7, Name: "Item 7" }
        ]);

        var petOwners = new ts.IArray([
          { Name: "Higa, Sidney", Pets: ["Scruffy", "Sam"] },
          { Name: "Ashkenazi, Ronen", Pets: ["Walker", "Sugar"] },
          { Name: "Price, Vernette", Pets: ["Scratches", "Diesel"] }
        ]);

        // Where & OrderByDesc
        var query = source
          .Where("m=>m.Id > 3 && m.Id < 6")
          .OrderByDescending("m=>m.Name");

        log.push("<b>Where & OrderByDesc</b>", "<br />");
        query.forEach(function(o) {
          log.push("Id = " + o.Id + ", Name = " + o.Name);
          log.push("<br />");
        });

        //Skip & Take
        query = source.Skip(3).Take(2);

        log.push("<br />");
        log.push("<b>Skip & Take</b>");
        log.push("<br />");
        query.forEach(function(o) {
          log.push("Id = " + o.Id + ", Name = " + o.Name);
          log.push("<br />");
        });

        //Select
        query = petOwners.Select("m=>m.Pets");

        log.push("<br />");
        log.push("<b>Select</b>");
        log.push("<br />");
        query.forEach(function(o) {
          log.push(o.join());
          log.push("<br />");
        });
        if (!query.Any()) log.push("<br />");

        //Zip
        var numbers = new ts.IArray([1, 2, 3, 4]);
        var words = new ts.IArray(["one", "two", "three"]);
        var numbersAndWords = numbers.Zip(
          words,
          '(first, second) => first + " " + second'
        );

        log.push("<br />");
        log.push("<b>Zip</b>");
        log.push("<br />");
        numbersAndWords.forEach(function(o) {
          log.push(o);
          log.push("<br />");
        });

        output.innerHTML = unescape(log.join(""));
      });
    </script>
    <h1>ArrayTs Demo Page</h1>
    <div><br /></div>
    <div id="output"></div>
    <div><br /></div>
  </body>
</html>
```

**[**`JavaScript`**](https://www.javascript.com/) output:**

>***ArrayTs Demo Page***
>
>**Where & OrderByDesc**
>
>Id = 5, Name = Item 5
>
>Id = 4, Name = Item 4
>
>**Skip & Take**
>
>Id = 4, Name = Item 4
>
>Id = 5, Name = Item 5
>
>**Select**
>
>Scruffy,Sam
>Walker,Sugar
>Scratches,Diesel
>
>**Zip**
>
>1 one
>
>2 two
>
>3 three

**Version Specifics:**

***Current Version:*** [**`ArrayTs (2020)`**](https://github.com/RyanMauldin/ArrayTs)
***, Author:*** [**`Ryan Mauldin`**](https://github.com/ryanmauldin)

**Refactor Notes:**

***02/27/2020:*** [**`Ryan Mauldin`**](https://github.com/ryanmauldin)
***, refactored*** the *original* [**`ArrayJs (2013)`**](https://github.com/EmptyCubes/Array.js)
*library* using a ***completely*** [**`TypeScript`**](http://www.typescriptlang.org/)
***& non prototype-based*** *approach*.

**History:**

***Original Version:*** [**`ArrayJs (2013)`**](https://github.com/EmptyCubes/Array.js)
***, Authors:*** [**`Jack Godwin`**](https://github.com/KodingSykosis) ***&***
[**`Ryan Mauldin`**](https://github.com/ryanmauldin)

[**`ArrayTs (2020)`**](https://github.com/RyanMauldin/ArrayTs) gained its *origins* from an earlier
[**`JavaScript`**](https://www.javascript.com/) based *project* [**`ArrayJs (2013)`**](https://github.com/EmptyCubes/Array.js).
[**`ArrayJs`**](https://github.com/EmptyCubes/Array.js), ***differed*** in *implementation semantics*, in that the
[**`IEnumerable<T>`**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
*extension methods* exposed to the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
*type*, were previously ***coupled*** *directly* to the the [**`JavaScript`**](https://www.javascript.com/)
[**`array`**](https://www.w3schools.com/js/js_arrays.asp) *type*, through ***prototype*** *extension method definitions*,
e.g., ***`Array.prototype.zip = function (second, zipFn) {...}`***.

When ***prototype*** *extension method definitions* are used in ***isolation*** of other ***conflicting***
*libraries*, the *extended* ***prototype*** *coding conventions* are ***practical*** and *work* as ***intended***.
***Prototype*** *extension method definitions* are *available* to be *called* ***directly*** from the
*code context* of the extended ***root type***, e.g. [**`JavaScript`**](https://www.javascript.com/)
[**`array`**](https://www.w3schools.com/js/js_arrays.asp) *type*. ***Prototype-based*** *extension method*
approaches will typically not *incur* additional *code implementation overhead* costs, in regards to
***downstream*** *code implementation complexity*.

Utilizing ***prototype-based***, *extension method conventions*, was **not** a *favorable design approach*,
when contemplating the *redesign* with [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs).
The ***stance*** [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) is taking ***now***, is that *this library*
***must*** be *reliable* and *resilient* to *failure*, throughout an application's ***entire*** *development*
*life-cycle*. [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) **must** remain *resilient to failure* when
*adding* or *swapping out*, additional *external* [**`JavaScript`**](https://www.javascript.com/) or
[**`TypeScript`**](http://www.typescriptlang.org/) *repository packages* from *popular sources*, e.g.
[**`npm`**](https://www.npmjs.com/) or [**`bower`**](https://bower.io/). [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs)
will remain ***side-effect free***, while developers are ***implementing*** *solution configuration changes*, as well as when
*upgrading* [**`TypeScript`**](http://www.typescriptlang.org/) versions. [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs)
***now*** has the *capability* to gain ***adoption*** by the *development community*, as *code integration*
is ***safeguarded*** by the [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *namespace*.

For [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) to *achieve* this *new* ***desired level*** of *dependability*
and *supportability*; the *new redesign* ***avoided*** *use of*, and *included* ***removal of*** *all* ***prototype***
*extension method definitions*, throughout the *library*. *Pitfalls* for *extending* ***prototype*** *method definitions*
on a ***common type***, such as the *built-in* [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp)
*type*, placed [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) at *great risk* for ***external*** *package repository*
[**`integration failures`**](https://stackoverflow.com/questions/8859828/javascript-what-dangers-are-in-extending-array-prototype),
e.g. when consuming other ***well-known*** *repository library packages* from ***popular*** *package repository sources*,
e.g. [**`npm`**](https://www.npmjs.com/) or [**`bower`**](https://bower.io/).

*Importing* ***external*** *repository packages* into a project always has the *potential* to ***introduce*** *extension method*
***naming collisions*** between *repository packages*. For *libraries* which do ***compete*** with *extending* the
[**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp) *type*, with their own
***prototype*** *extension method definitions*. This is *especially true* for [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs),
when *considering* the following ***implemented*** *method names*, e.g. ***`Clone(), Count(), Contains()`***. These
***implemented*** *method names*, are in fact ***commonly*** *used names*, from within the *software development space*,
and are *likely* to be the ***first*** *method names* to ***collide*** with other *library* design *implementations*. As well,
the ***`Clone()`*** *method* does ***not*** *exist* on the [**`IEnumerable<T>`**](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=netframework-4.8)
*interface* for instance, and is *custom* to this [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *implementation*.
However, there is a very high likelihood, that other common ***external*** *repository packages* have already extended
the [**`JavaScript`**](https://www.javascript.com/) [**`array`**](https://www.w3schools.com/js/js_arrays.asp) *type* with their
own ***`Clone()`*** *extension method*, which is why [**`ArrayTs`**](https://github.com/RyanMauldin/ArrayTs) *removed all*
***prototype-based*** *extension methods* and ***provided*** *cleaner community interoperability* through ***interfaces***
and ***namespaces***.
