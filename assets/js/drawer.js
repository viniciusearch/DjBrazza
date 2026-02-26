function featuresDrawer() {
  return {
    drawerOpen: false,
    activeCard: null,
    
    openDrawer(cardType) {
      this.activeCard = cardType;
      this.drawerOpen = true;
      document.body.style.overflow = 'hidden';
      console.log('teste')
    },
    
    closeDrawer() {
      this.drawerOpen = false;
      setTimeout(() => {
        this.activeCard = null;
        document.body.style.overflow = '';
      }, 300);
    }
  }
}