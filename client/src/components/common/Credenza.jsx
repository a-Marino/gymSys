import * as React from 'react';
import { cn } from '../../lib/utils';
import { useMediaQuery } from '../../hooks/use-media-query';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './Drawer';

const desktop = '(min-width: 768px)';

const Credenza = ({ children, ...props }) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaComponent = isDesktop ? Dialog : Drawer;

  return <CredenzaComponent {...props}>{children}</CredenzaComponent>;
};

const CredenzaTrigger = ({ className, children, ...props }) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaTriggerComponent = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <CredenzaTriggerComponent className={className} {...props}>
      {children}
    </CredenzaTriggerComponent>
  );
};

const CredenzaClose = ({ className, children, ...props }) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaCloseComponent = isDesktop ? DialogClose : DrawerClose;

  return (
    <CredenzaCloseComponent className={className} {...props}>
      {children}
    </CredenzaCloseComponent>
  );
};

const CredenzaContent = ({ className, children, ...props }) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaContentComponent = isDesktop ? DialogContent : DrawerContent;

  return (
    <CredenzaContentComponent className={className} {...props}>
      {children}
    </CredenzaContentComponent>
  );
};

const CredenzaDescription = ({ className, children, ...props }) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaDescriptionComponent = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <CredenzaDescriptionComponent className={className} {...props}>
      {children}
    </CredenzaDescriptionComponent>
  );
};

const CredenzaHeader = ({ className, children, ...props }) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaHeaderComponent = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <CredenzaHeaderComponent className={className} {...props}>
      {children}
    </CredenzaHeaderComponent>
  );
};

const CredenzaTitle = ({ className, children, ...props }) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaTitleComponent = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <CredenzaTitleComponent className={className} {...props}>
      {children}
    </CredenzaTitleComponent>
  );
};

const CredenzaBody = ({ className, children, ...props }) => {
  return (
    <div className={cn('px-4 md:px-0', className)} {...props}>
      {children}
    </div>
  );
};

const CredenzaFooter = ({ className, children, ...props }) => {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaFooterComponent = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <CredenzaFooterComponent className={className} {...props}>
      {children}
    </CredenzaFooterComponent>
  );
};

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
};
