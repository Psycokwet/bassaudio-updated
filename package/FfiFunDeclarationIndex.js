/**
 * Created by scarboni on 24.12.2020
 */

class FfiFunDeclarations {
  add(lib, dep, ffiFunDeclarations) {
    // console.log(lib + ":" + this[lib]);
    if (this[lib])
      this[lib] = {
        dep: this[lib].dep,
        ffiFunDeclarations: {
          ...this[lib].ffiFunDeclarations,
          ...ffiFunDeclarations,
        },
      };
    else this[lib] = { dep: dep, ffiFunDeclarations: ffiFunDeclarations };
  }
  get(lib) {
    return this[lib].ffiFunDeclarations;
  }
  getDep(lib) {
    return this[lib].dep;
  }
}
exports = module.exports = new FfiFunDeclarations();
