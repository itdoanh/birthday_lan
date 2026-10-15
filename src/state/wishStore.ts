import { create } from 'zustand';

interface WishState {
  open: boolean;
  blown: boolean;
  showMessage: boolean;
  openWish: () => void;
  closeWish: () => void;
  blowCandle: () => void;
  showFinalMessage: () => void;
  reset: () => void;
}

export const useWishStore = create<WishState>((set) => ({
  open: false,
  blown: false,
  showMessage: false,
  openWish: () => set({ open: true }),
  closeWish: () => set({ open: false }),
  blowCandle: () => set({ blown: true, open: false }),
  showFinalMessage: () => set({ showMessage: true }),
  reset: () => set({ open: false, blown: false, showMessage: false }),
}));
