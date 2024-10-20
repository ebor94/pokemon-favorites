import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: false,
    loadingStack: [],
  }),
  actions: {
    setLoading(value, source) {
      console.log(`Setting loading to ${value} from ${source}`);
      this.loading = value;
      if (value) {
        this.loadingStack.push(source);
      } else {
        const index = this.loadingStack.indexOf(source);
        if (index > -1) {
          this.loadingStack.splice(index, 1);
        }
      }
      console.log('Current loading stack:', this.loadingStack);
    },
  },
});