

function skinRoute(skin) {
    switch (skin) {
      case 'gallery':
        return GalleryView;
      default:
        return DefaultView;
    }
  }
  
