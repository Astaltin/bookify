(function () {
   const scrollTop = $('.scrollTop');
   const header = $('.header');
   const navController = $('#nav-controller');
   const navList = $('#nav-list');
   const booksImage = $('.books__image');
   const slickDots = $('.slick-dots');

   const breakpoints = window.matchMedia('(min-width: 40em)');
   let isNavOpen = false;

   scrollTop.on('click', () => $(window).scrollTop(0));

   $(window).on('scroll', function () {
      const scrollY = this.scrollY;
      toggleHeaderShadowOnScroll(scrollY);
      updatePageTitleAndHistory(scrollY);
   });

   navController.on('click', () => toggleNav());
   navController.on('blur', () => closeNavOnBlur());

   breakpoints.addEventListener('change', handleResize);
   handleResize();

   booksImage.slick({
      mobileFirst: true,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 5000,
   });

   slickDots.children().attr('tabindex', '-1');

   function toggleHeaderShadowOnScroll(scrollY) {
      header.toggleClass('shadow', scrollY >= 69);
   }

   function updatePageTitleAndHistory(scrollY) {
      const sections = [
         { scroll: 1402.5, title: 'Contact', url: '#contact' },
         { scroll: 1014.33, title: 'About', url: '#about' },
         { scroll: 583.1, title: 'Books', url: '#books' },
      ];

      const { title = 'Bookify', url = '/' } =
         sections.find((sec) => scrollY >= sec.scroll) || {};
      document.title = title === 'Bookify' ? title : `${title} | Bookify`;
      window.history.pushState({}, '', url);
   }

   function toggleNav() {
      isNavOpen ? closeNav() : openNav();
   }

   function closeNavOnBlur() {
      setTimeout(() => isNavOpen && closeNav(), 250);
   }

   function closeNav() {
      navList.removeAttr('data-show');
      $(document.body).removeAttr('style');
      isNavOpen = false;
   }

   function openNav() {
      navList.attr('data-show', 'mobile');
      $(document.body).css({ overflow: 'hidden' });
      isNavOpen = true;
   }

   function handleResize() {
      navList.attr(
         'data-show',
         breakpoints.matches ? '' : isNavOpen ? 'mobile' : null
      );
   }
})();
