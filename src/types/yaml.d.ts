declare module '*.yaml' {
  const data: import('../i18n/translations').TranslationData;
  export default data;
}
