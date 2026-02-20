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

export interface ElementApproachCards extends Struct.ComponentSchema {
  collectionName: 'components_element_approach_cards';
  info: {
    displayName: 'approachCards';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    imageNum: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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

export interface ElementCaseBannerTraffic extends Struct.ComponentSchema {
  collectionName: 'components_element_case_banner_traffics';
  info: {
    displayName: 'caseBannerTraffic';
  };
  attributes: {
    desc: Schema.Attribute.String;
    trafficNum: Schema.Attribute.String;
  };
}

export interface ElementCaseChallengeCards extends Struct.ComponentSchema {
  collectionName: 'components_element_case_challenge_cards';
  info: {
    displayName: 'caseChallengeCards';
  };
  attributes: {
    csChallenge: Schema.Attribute.String;
    csResolution: Schema.Attribute.String;
    csResult: Schema.Attribute.String;
    numImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ElementCaseMetricValues extends Struct.ComponentSchema {
  collectionName: 'components_element_case_metric_values';
  info: {
    displayName: 'caseMetricValues';
  };
  attributes: {
    caseMetric: Schema.Attribute.String;
    description: Schema.Attribute.String;
    metricValue: Schema.Attribute.String;
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

export interface ElementMetricPoints extends Struct.ComponentSchema {
  collectionName: 'components_element_metric_points';
  info: {
    displayName: 'metricPoints';
  };
  attributes: {
    point: Schema.Attribute.String;
  };
}

export interface ElementResultImpact extends Struct.ComponentSchema {
  collectionName: 'components_element_result_impacts';
  info: {
    displayName: 'resultImpact';
  };
  attributes: {
    impactDesc: Schema.Attribute.String;
    impactPerc: Schema.Attribute.String;
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

export interface SectionCaseApproach extends Struct.ComponentSchema {
  collectionName: 'components_section_case_approaches';
  info: {
    displayName: 'caseApproach';
  };
  attributes: {
    card: Schema.Attribute.Component<'element.approach-cards', true>;
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionCaseBanner extends Struct.ComponentSchema {
  collectionName: 'components_section_case_banners';
  info: {
    displayName: 'caseBanner';
  };
  attributes: {
    bannerPara: Schema.Attribute.Blocks;
    bannerTraffic: Schema.Attribute.Component<
      'element.case-banner-traffic',
      true
    >;
    businessModel: Schema.Attribute.String;
    industry: Schema.Attribute.String;
    marketGeo: Schema.Attribute.String;
    servicesDelivered: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionCaseChallenge extends Struct.ComponentSchema {
  collectionName: 'components_section_case_challenges';
  info: {
    displayName: 'caseChallenge';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionCaseImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_section_case_image_sliders';
  info: {
    displayName: 'caseImageSlider';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SectionCaseImplementation extends Struct.ComponentSchema {
  collectionName: 'components_section_case_implementations';
  info: {
    displayName: 'caseImplementation';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionCaseMetrics extends Struct.ComponentSchema {
  collectionName: 'components_section_case_metrics';
  info: {
    displayName: 'caseMetrics';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    metric: Schema.Attribute.Component<'element.case-metric-values', true>;
    points: Schema.Attribute.Component<'element.metric-points', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionCaseResolution extends Struct.ComponentSchema {
  collectionName: 'components_section_case_resolutions';
  info: {
    displayName: 'caseResolution';
  };
  attributes: {
    csCards: Schema.Attribute.Component<'element.case-challenge-cards', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionCaseResults extends Struct.ComponentSchema {
  collectionName: 'components_section_case_results';
  info: {
    displayName: 'caseResults';
  };
  attributes: {
    impactCards: Schema.Attribute.Component<'element.result-impact', true>;
    title: Schema.Attribute.String;
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

export interface SectionCasestudysections extends Struct.ComponentSchema {
  collectionName: 'components_section_casestudysections';
  info: {
    displayName: 'casestudysections';
  };
  attributes: {
    businessModel: Schema.Attribute.String;
    industry: Schema.Attribute.String;
    marketGeo: Schema.Attribute.String;
    servicesDelivered: Schema.Attribute.String;
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

export interface SectionSectionWhythisWorked extends Struct.ComponentSchema {
  collectionName: 'components_section_section_whythis_workeds';
  info: {
    displayName: 'sectionWhythisWorked';
  };
  attributes: {
    button: Schema.Attribute.Component<'element.button', false>;
    description: Schema.Attribute.Blocks;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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
      'element.approach-cards': ElementApproachCards;
      'element.button': ElementButton;
      'element.card': ElementCard;
      'element.card1': ElementCard1;
      'element.case-banner-traffic': ElementCaseBannerTraffic;
      'element.case-challenge-cards': ElementCaseChallengeCards;
      'element.case-metric-values': ElementCaseMetricValues;
      'element.casestudy-card': ElementCasestudyCard;
      'element.faq': ElementFaq;
      'element.imgcard': ElementImgcard;
      'element.metric-points': ElementMetricPoints;
      'element.result-impact': ElementResultImpact;
      'element.tabs': ElementTabs;
      'element.testimonials': ElementTestimonials;
      'section.accordion1': SectionAccordion1;
      'section.accordion2': SectionAccordion2;
      'section.adv': SectionAdv;
      'section.banner': SectionBanner;
      'section.case-approach': SectionCaseApproach;
      'section.case-banner': SectionCaseBanner;
      'section.case-challenge': SectionCaseChallenge;
      'section.case-image-slider': SectionCaseImageSlider;
      'section.case-implementation': SectionCaseImplementation;
      'section.case-metrics': SectionCaseMetrics;
      'section.case-resolution': SectionCaseResolution;
      'section.case-results': SectionCaseResults;
      'section.casestudy': SectionCasestudy;
      'section.casestudysections': SectionCasestudysections;
      'section.faq': SectionFaq;
      'section.horizontaltab': SectionHorizontaltab;
      'section.outcome': SectionOutcome;
      'section.section-whythis-worked': SectionSectionWhythisWorked;
      'section.services-sec': SectionServicesSec;
      'section.testimonials': SectionTestimonials;
      'section.vertical-tab': SectionVerticalTab;
      'section.whyyourpartner': SectionWhyyourpartner;
      'section.yourbrandyourstrategy': SectionYourbrandyourstrategy;
    }
  }
}
