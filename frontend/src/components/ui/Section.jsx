import React from 'react';

export const SectionWrap = ({ children, id, className = '', container = true }) => {
  return (
    <section id={id} className={`relative ${className}`}>
      {container ? <div className="container-x">{children}</div> : children}
    </section>
  );
};

export const Eyebrow = ({ children, icon: Icon, className = '' }) => (
  <div className={`eyebrow ${className}`}>
    {Icon ? <Icon className="h-3.5 w-3.5" strokeWidth={2.2} /> : null}
    <span>{children}</span>
  </div>
);

export const SectionHeading = ({ eyebrow, title, lead, align = 'left', className = '' }) => {
  const isCenter = align === 'center';
  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow ? (
        <div className={`mb-5 ${isCenter ? 'flex justify-center' : ''}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="h-section text-3xl sm:text-4xl lg:text-[44px] text-balance">
        {title}
      </h2>
      {lead ? (
        <p className={`mt-5 text-[17px] leading-[1.6] text-charcoal-500 text-pretty ${isCenter ? 'mx-auto max-w-2xl' : ''}`}>
          {lead}
        </p>
      ) : null}
    </div>
  );
};
