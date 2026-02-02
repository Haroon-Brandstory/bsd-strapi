import type { Schema, Struct } from '@strapi/strapi';

export interface ElementAccordion extends Struct.ComponentSchema {
  collectionName: 'components_element_accordions';
  info: {
    displayName: 'accordion';
  };
  attributes: {
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ElementButton extends Struct.ComponentSchema {
  collectionName: 'components_element_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
  };
}

export interface ElementCard extends Struct.ComponentSchema {
  collectionName: 'components_element_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ElementCard1 extends Struct.ComponentSchema {
  collectionName: 'components_element_card1s';
  info: {
    displayName: 'card1';
  };
  attributes: {
    bgcolor: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ElementCasestudyCard extends Struct.ComponentSchema {
  collectionName: 'components_element_casestudy_cards';
  info: {
    displayName: 'casestudyCard';
  };
  attributes: {
    goal: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    result: Schema.Attribute.String;
    solution: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementFaq extends Struct.ComponentSchema {
  collectionName: 'components_element_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    question: Schema.Attribute.String;
  };
}

export interface ElementImgcard extends Struct.ComponentSchema {
  collectionName: 'components_element_imgcards';
  info: {
    displayName: 'imgcard';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ElementTabs extends Struct.ComponentSchema {
  collectionName: 'components_element_tabs';
  info: {
    displayName: 'tabs';
  };
  attributes: {
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ElementTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_element_testimonials';
  info: {
    displayName: 'testimonials';
    icon: 'book';
  };
  attributes: {
    author: Schema.Attribute.String;
    position: Schema.Attribute.String;
    review: Schema.Attribute.Text;
  };
}

export interface SectionAccordion1 extends Struct.ComponentSchema {
  collectionName: 'components_section_accordion1s';
  info: {
    displayName: 'accordion1';
  };
  attributes: {
    accordion: Schema.Attribute.Component<'element.accordion', true>;
    bottomPara: Schema.Attribute.Blocks;
    orangeText: Schema.Attribute.String;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionAccordion2 extends Struct.ComponentSchema {
  collectionName: 'components_section_accordion2s';
  info: {
    displayName: 'accordion2';
  };
  attributes: {
    accordion: Schema.Attribute.Component<'element.accordion', true>;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionAdv extends Struct.ComponentSchema {
  collectionName: 'components_section_advs';
  info: {
    displayName: 'adv';
  };
  attributes: {
    button1Label: Schema.Attribute.String;
    button1Url: Schema.Attribute.String;
    button2Label: Schema.Attribute.String;
    button2Url: Schema.Attribute.String;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionBanner extends Struct.ComponentSchema {
  collectionName: 'components_section_banners';
  info: {
    displayName: 'banner';
  };
  attributes: {
    bannerPara: Schema.Attribute.Blocks;
    buttons: Schema.Attribute.Component<'element.button', true>;
    orangeText: Schema.Attribute.String;
    sectionHeading: Schema.Attribute.String;
  };
}

export interface SectionCasestudy extends Struct.ComponentSchema {
  collectionName: 'components_section_casestudies';
  info: {
    displayName: 'casestudy';
  };
  attributes: {
    bottomPara: Schema.Attribute.Blocks;
    casestudyCard: Schema.Attribute.Component<'element.casestudy-card', true>;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionFaq extends Struct.ComponentSchema {
  collectionName: 'components_section_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    faq: Schema.Attribute.Component<'element.faq', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionHorizontaltab extends Struct.ComponentSchema {
  collectionName: 'components_section_horizontaltabs';
  info: {
    displayName: 'horizontaltab';
  };
  attributes: {
    tabs: Schema.Attribute.Component<'element.tabs', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionOutcome extends Struct.ComponentSchema {
  collectionName: 'components_section_outcomes';
  info: {
    displayName: 'outcome';
  };
  attributes: {
    bottomPara: Schema.Attribute.Blocks;
    card: Schema.Attribute.Component<'element.card', true>;
    orangeText: Schema.Attribute.String;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionServicesSec extends Struct.ComponentSchema {
  collectionName: 'components_section_services_secs';
  info: {
    displayName: 'services_sec';
  };
  attributes: {
    bottomPara: Schema.Attribute.Blocks;
    imgcards: Schema.Attribute.Component<'element.imgcard', true>;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_section_testimonials';
  info: {
    displayName: 'testimonials';
  };
  attributes: {
    testimonials: Schema.Attribute.Component<'element.testimonials', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionVerticalTab extends Struct.ComponentSchema {
  collectionName: 'components_section_vertical_tabs';
  info: {
    displayName: 'verticalTab';
  };
  attributes: {
    para: Schema.Attribute.Blocks;
    tabs: Schema.Attribute.Component<'element.tabs', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionWhyyourpartner extends Struct.ComponentSchema {
  collectionName: 'components_section_whyyourpartners';
  info: {
    displayName: 'whyyourpartner';
  };
  attributes: {
    bottomPara: Schema.Attribute.Blocks;
    cards: Schema.Attribute.Component<'element.card1', true>;
    para: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionYourbrandyourstrategy extends Struct.ComponentSchema {
  collectionName: 'components_section_yourbrandyourstrategies';
  info: {
    displayName: 'yourbrandyourstrategy';
  };
  attributes: {
    cards: Schema.Attribute.Component<'element.card1', true>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'element.accordion': ElementAccordion;
      'element.button': ElementButton;
      'element.card': ElementCard;
      'element.card1': ElementCard1;
      'element.casestudy-card': ElementCasestudyCard;
      'element.faq': ElementFaq;
      'element.imgcard': ElementImgcard;
      'element.tabs': ElementTabs;
      'element.testimonials': ElementTestimonials;
      'section.accordion1': SectionAccordion1;
      'section.accordion2': SectionAccordion2;
      'section.adv': SectionAdv;
      'section.banner': SectionBanner;
      'section.casestudy': SectionCasestudy;
      'section.faq': SectionFaq;
      'section.horizontaltab': SectionHorizontaltab;
      'section.outcome': SectionOutcome;
      'section.services-sec': SectionServicesSec;
      'section.testimonials': SectionTestimonials;
      'section.vertical-tab': SectionVerticalTab;
      'section.whyyourpartner': SectionWhyyourpartner;
      'section.yourbrandyourstrategy': SectionYourbrandyourstrategy;
    }
  }
}
