/**
 * - `isARegistryExport` · a registry module's ids: an export named `{screen}TestIds`
 */
const A_REGISTRY_EXPORT = /TestIds$/;

// the framework's convention, never a scope's knob: a product's flows and its gates read ids by it
const isARegistryExport = (name: string): boolean =>
  A_REGISTRY_EXPORT.test(name);

export { isARegistryExport };
