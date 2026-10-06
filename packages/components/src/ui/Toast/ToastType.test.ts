import { contenuDuToast } from './ToastType';

test("sans leading, l'icone vient du variant", () => {
  expect(contenuDuToast('success')).toBe('CircleCheck');
  expect(contenuDuToast('default')).toBeNull();
});

test("leading remplace l'icone du variant", () => {
  expect(contenuDuToast('success', 'Mail')).toBe('Mail');
});

test("leading={null} retire l'icone du variant", () => {
  expect(contenuDuToast('error', null)).toBeNull();
});
