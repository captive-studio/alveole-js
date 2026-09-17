// Cette redirection n'est jamais chargee par l'application : Metro resout toujours une
// variante de plateforme pour l'import `./DocumentViewerPDF` de `DocumentViewer.tsx`
// (`.web.tsx` sur le web, `.native.tsx` sur iOS/Android). `tsc`, lui, n'a pas cette notion de
// plateforme et a besoin d'un fichier exact `./DocumentViewerPDF` pour typer cet import :
// sans lui, le typecheck echoue sur un module que l'execution n'atteint jamais.
export * from './DocumentViewerPDF.web';
