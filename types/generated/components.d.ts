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

export interface ElementBlogContent extends Struct.ComponentSchema {
  collectionName: 'components_element_blog_contents';
  info: {
    displayName: 'blogContent';
  };
  attributes: {
    blogContent: Schema.Attribute.Blocks;
  };
}

export interface ElementBlogImage extends Struct.ComponentSchema {
  collectionName: 'components_element_blog_images';
  info: {
    displayName: 'blogImage';
  };
  attributes: {
    blogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
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

export interface ElementCases extends Struct.ComponentSchema {
  collectionName: 'components_element_cases';
  info: {
    displayName: 'cases';
  };
  attributes: {
    businessImpact: Schema.Attribute.String;
    description: Schema.Attribute.String;
    services: Schema.Attribute.Component<'element.services-include', true>;
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

export interface ElementCells extends Struct.ComponentSchema {
  collectionName: 'components_element_cells';
  info: {
    displayName: 'cells';
  };
  attributes: {
    tableData: Schema.Attribute.Text;
  };
}

export interface ElementExample extends Struct.ComponentSchema {
  collectionName: 'components_element_examples';
  info: {
    displayName: 'example';
  };
  attributes: {
    text: Schema.Attribute.String;
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

export interface ElementHighlights extends Struct.ComponentSchema {
  collectionName: 'components_element_highlights';
  info: {
    displayName: 'highlights';
  };
  attributes: {
    highlight: Schema.Attribute.String;
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

export interface ElementImpactItems extends Struct.ComponentSchema {
  collectionName: 'components_element_impact_items';
  info: {
    displayName: 'impactItems';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementList extends Struct.ComponentSchema {
  collectionName: 'components_element_lists';
  info: {
    displayName: 'list';
  };
  attributes: {
    point: Schema.Attribute.Text;
  };
}

export interface ElementListCard extends Struct.ComponentSchema {
  collectionName: 'components_element_list_cards';
  info: {
    displayName: 'list Card';
  };
  attributes: {
    cardTitle: Schema.Attribute.String;
    list: Schema.Attribute.Component<'element.list', true>;
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

export interface ElementRepRecommendations extends Struct.ComponentSchema {
  collectionName: 'components_element_rep_recommendations';
  info: {
    displayName: 'repRecommendations';
  };
  attributes: {
    cards: Schema.Attribute.Component<
      'industry-reports.recommendation-cards',
      true
    >;
    sectionTitle: Schema.Attribute.String;
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

export interface ElementServicesInclude extends Struct.ComponentSchema {
  collectionName: 'components_element_services_includes';
  info: {
    displayName: 'servicesInclude';
  };
  attributes: {
    service: Schema.Attribute.String;
  };
}

export interface ElementSteps extends Struct.ComponentSchema {
  collectionName: 'components_element_steps';
  info: {
    displayName: 'steps';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementTableHeading extends Struct.ComponentSchema {
  collectionName: 'components_element_table_headings';
  info: {
    displayName: 'tableHeading';
  };
  attributes: {
    heading: Schema.Attribute.String;
  };
}

export interface ElementTableRow extends Struct.ComponentSchema {
  collectionName: 'components_element_table_rows';
  info: {
    displayName: 'tableRow';
  };
  attributes: {
    cells: Schema.Attribute.Component<'element.cells', true>;
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

export interface IndustryReportsAdoptionCards extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_adoption_cards';
  info: {
    displayName: 'adoptionCards';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsAeoGeoCard extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_aeo_geo_cards';
  info: {
    displayName: 'aeo-geo-card';
  };
  attributes: {
    points: Schema.Attribute.Component<'element.list', true>;
    subtitle: Schema.Attribute.Text;
    text: Schema.Attribute.Component<'element.example', true>;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsBenchmarkCard extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_benchmark_cards';
  info: {
    displayName: 'benchmarkCard';
  };
  attributes: {
    domAuthority: Schema.Attribute.String;
    numValue: Schema.Attribute.String;
    textBottom: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsCitySpecific extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_city_specifics';
  info: {
    displayName: 'citySpecific';
  };
  attributes: {
    cityName: Schema.Attribute.String;
    cityTable: Schema.Attribute.Component<'industry-reports.table', false>;
  };
}

export interface IndustryReportsDataSources extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_data_sources';
  info: {
    displayName: 'dataSources';
  };
  attributes: {
    listicles: Schema.Attribute.Component<'element.list', true>;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsImpactCard extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_impact_cards';
  info: {
    displayName: 'impactCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsKeyfindingCard extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_keyfinding_cards';
  info: {
    displayName: 'keyfindingCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsKeywordIntentSplit
  extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_keyword_intent_splits';
  info: {
    displayName: 'keywordIntentSplit';
  };
  attributes: {
    example: Schema.Attribute.Text;
    keyword: Schema.Attribute.String;
  };
}

export interface IndustryReportsOverviewListcards
  extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_overview_listcards';
  info: {
    displayName: 'overviewListcards';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsPurposeCards extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_purpose_cards';
  info: {
    displayName: 'purposeCards';
  };
  attributes: {
    description: Schema.Attribute.Text;
    number: Schema.Attribute.String;
  };
}

export interface IndustryReportsRecommendationCards
  extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_recommendation_cards';
  info: {
    displayName: 'recommendationCards';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsRecommendations extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_recommendations';
  info: {
    displayName: 'recommendations';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsRepAppendix extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_appendices';
  info: {
    displayName: 'repAppendix';
  };
  attributes: {
    sectionTitle: Schema.Attribute.String;
    sources: Schema.Attribute.Component<'industry-reports.data-sources', true>;
  };
}

export interface IndustryReportsRepBanner extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_banners';
  info: {
    displayName: 'repBanner';
  };
  attributes: {
    cta: Schema.Attribute.Component<'element.button', false>;
    preparedBy: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsRepCompAndMarketLeaders
  extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_comp_and_market_leaders';
  info: {
    displayName: 'repCompAndMarketLeaders';
  };
  attributes: {
    benchmark: Schema.Attribute.Component<
      'industry-reports.benchmark-card',
      false
    >;
    cardTitle: Schema.Attribute.String;
    emergingCompetitor: Schema.Attribute.Component<'element.list', true>;
    perfTable: Schema.Attribute.Component<'industry-reports.table', false>;
    points: Schema.Attribute.Component<'element.list', true>;
    sectionTitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface IndustryReportsRepContentAndInsights
  extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_content_and_insights';
  info: {
    displayName: 'repContentAndInsights';
  };
  attributes: {
    adoptCard: Schema.Attribute.Component<
      'industry-reports.adoption-cards',
      true
    >;
    listCards: Schema.Attribute.Component<'element.list-card', true>;
    schemaAdoptionTitle: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface IndustryReportsRepExcSummary extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_exc_summaries';
  info: {
    displayName: 'repExcSummary';
  };
  attributes: {
    card: Schema.Attribute.Component<'industry-reports.purpose-cards', true>;
    keyfindings: Schema.Attribute.Component<
      'industry-reports.keyfinding-card',
      true
    >;
    purpose: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
    snapshotOfOpportunities: Schema.Attribute.Component<
      'industry-reports.snapshot',
      true
    >;
  };
}

export interface IndustryReportsRepFuture extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_futures';
  info: {
    displayName: 'repFuture';
  };
  attributes: {
    growthCard: Schema.Attribute.Component<
      'industry-reports.impact-card',
      false
    >;
    impactCard: Schema.Attribute.Component<
      'industry-reports.impact-card',
      false
    >;
    numComp: Schema.Attribute.Component<
      'industry-reports.purpose-cards',
      false
    >;
    sectionTitle: Schema.Attribute.String;
    techCard: Schema.Attribute.Component<
      'industry-reports.purpose-cards',
      false
    >;
  };
}

export interface IndustryReportsRepIndOverview extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_ind_overviews';
  info: {
    displayName: 'repIndOverview';
  };
  attributes: {
    cards: Schema.Attribute.Component<'industry-reports.purpose-cards', true>;
    ListCards: Schema.Attribute.Component<
      'industry-reports.overview-listcards',
      true
    >;
  };
}

export interface IndustryReportsRepOptimization extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_optimizations';
  info: {
    displayName: 'repOptimization';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    dominanceLabel: Schema.Attribute.String;
    example: Schema.Attribute.String;
    exampleAnswer: Schema.Attribute.String;
    ratingLabel: Schema.Attribute.String;
    ratingNumber: Schema.Attribute.String;
    recommendation: Schema.Attribute.Component<
      'industry-reports.recommendations',
      true
    >;
    recommendationLabel: Schema.Attribute.Text;
    reviewNum: Schema.Attribute.String;
    reviewSignalLabel: Schema.Attribute.String;
    revLabel: Schema.Attribute.String;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface IndustryReportsRepPerfBenchMark
  extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_perf_bench_marks';
  info: {
    displayName: 'repPerfBenchMark';
  };
  attributes: {
    cards: Schema.Attribute.Component<'industry-reports.purpose-cards', true>;
    sectionTitle: Schema.Attribute.String;
    splitCards: Schema.Attribute.Component<
      'industry-reports.keyword-intent-split',
      true
    >;
    splitTitle: Schema.Attribute.String;
  };
}

export interface IndustryReportsRepSearchVolumeAnalysis
  extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_search_volume_analyses';
  info: {
    displayName: 'repSearchVolumeAnalysis';
  };
  attributes: {
    cardTitle: Schema.Attribute.String;
    cityCards: Schema.Attribute.Component<
      'industry-reports.city-specific',
      true
    >;
    insightDesc: Schema.Attribute.Text;
    insightTitle: Schema.Attribute.String;
    insightValue: Schema.Attribute.String;
    searchValues: Schema.Attribute.Component<
      'industry-reports.purpose-cards',
      true
    >;
    sectionTitle: Schema.Attribute.String;
    totalSearchVolume: Schema.Attribute.String;
  };
}

export interface IndustryReportsRepStrategy extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_strategies';
  info: {
    displayName: 'repStrategy';
  };
  attributes: {
    cards: Schema.Attribute.Component<'industry-reports.aeo-geo-card', true>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface IndustryReportsRepTechBenchMark
  extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_rep_tech_bench_marks';
  info: {
    displayName: 'repTechBenchMark';
  };
  attributes: {
    cards: Schema.Attribute.Component<'industry-reports.purpose-cards', true>;
    listicles: Schema.Attribute.Component<'element.list-card', true>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface IndustryReportsSnapshot extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_snapshots';
  info: {
    displayName: 'snapshot';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
  };
}

export interface IndustryReportsTable extends Struct.ComponentSchema {
  collectionName: 'components_industry_reports_tables';
  info: {
    displayName: 'table';
  };
  attributes: {
    heading: Schema.Attribute.Component<'element.table-heading', true>;
    Row: Schema.Attribute.Component<'element.table-row', true>;
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
    description: Schema.Attribute.Blocks;
    tabs: Schema.Attribute.Component<'element.tabs', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionIndBanner extends Struct.ComponentSchema {
  collectionName: 'components_section_ind_banners';
  info: {
    displayName: 'indBanner';
  };
  attributes: {
    button1: Schema.Attribute.Component<'element.button', false>;
    button2: Schema.Attribute.Component<'element.button', false>;
    description: Schema.Attribute.Blocks;
    highlights: Schema.Attribute.Component<'element.highlights', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionIndDigitalMarketing extends Struct.ComponentSchema {
  collectionName: 'components_section_ind_digital_marketings';
  info: {
    displayName: 'indDigitalMarketing';
  };
  attributes: {
    description: Schema.Attribute.String;
    dmcase: Schema.Attribute.Component<'element.cases', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionIndGrowth extends Struct.ComponentSchema {
  collectionName: 'components_section_ind_growths';
  info: {
    displayName: 'indGrowth';
  };
  attributes: {
    step: Schema.Attribute.Component<'element.steps', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionIndObjectives extends Struct.ComponentSchema {
  collectionName: 'components_section_ind_objectives';
  info: {
    displayName: 'indObjectives';
  };
  attributes: {
    cards: Schema.Attribute.Component<'element.approach-cards', true>;
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SectionIndResults extends Struct.ComponentSchema {
  collectionName: 'components_section_ind_results';
  info: {
    displayName: 'indResults';
  };
  attributes: {
    item: Schema.Attribute.Component<'element.impact-items', true>;
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
  export namespace Public {
    export interface ComponentSchemas {
      'element.accordion': ElementAccordion;
      'element.approach-cards': ElementApproachCards;
      'element.blog-content': ElementBlogContent;
      'element.blog-image': ElementBlogImage;
      'element.button': ElementButton;
      'element.card': ElementCard;
      'element.card1': ElementCard1;
      'element.case-banner-traffic': ElementCaseBannerTraffic;
      'element.case-challenge-cards': ElementCaseChallengeCards;
      'element.case-metric-values': ElementCaseMetricValues;
      'element.cases': ElementCases;
      'element.casestudy-card': ElementCasestudyCard;
      'element.cells': ElementCells;
      'element.example': ElementExample;
      'element.faq': ElementFaq;
      'element.highlights': ElementHighlights;
      'element.imgcard': ElementImgcard;
      'element.impact-items': ElementImpactItems;
      'element.list': ElementList;
      'element.list-card': ElementListCard;
      'element.metric-points': ElementMetricPoints;
      'element.rep-recommendations': ElementRepRecommendations;
      'element.result-impact': ElementResultImpact;
      'element.services-include': ElementServicesInclude;
      'element.steps': ElementSteps;
      'element.table-heading': ElementTableHeading;
      'element.table-row': ElementTableRow;
      'element.tabs': ElementTabs;
      'element.testimonials': ElementTestimonials;
      'industry-reports.adoption-cards': IndustryReportsAdoptionCards;
      'industry-reports.aeo-geo-card': IndustryReportsAeoGeoCard;
      'industry-reports.benchmark-card': IndustryReportsBenchmarkCard;
      'industry-reports.city-specific': IndustryReportsCitySpecific;
      'industry-reports.data-sources': IndustryReportsDataSources;
      'industry-reports.impact-card': IndustryReportsImpactCard;
      'industry-reports.keyfinding-card': IndustryReportsKeyfindingCard;
      'industry-reports.keyword-intent-split': IndustryReportsKeywordIntentSplit;
      'industry-reports.overview-listcards': IndustryReportsOverviewListcards;
      'industry-reports.purpose-cards': IndustryReportsPurposeCards;
      'industry-reports.recommendation-cards': IndustryReportsRecommendationCards;
      'industry-reports.recommendations': IndustryReportsRecommendations;
      'industry-reports.rep-appendix': IndustryReportsRepAppendix;
      'industry-reports.rep-banner': IndustryReportsRepBanner;
      'industry-reports.rep-comp-and-market-leaders': IndustryReportsRepCompAndMarketLeaders;
      'industry-reports.rep-content-and-insights': IndustryReportsRepContentAndInsights;
      'industry-reports.rep-exc-summary': IndustryReportsRepExcSummary;
      'industry-reports.rep-future': IndustryReportsRepFuture;
      'industry-reports.rep-ind-overview': IndustryReportsRepIndOverview;
      'industry-reports.rep-optimization': IndustryReportsRepOptimization;
      'industry-reports.rep-perf-bench-mark': IndustryReportsRepPerfBenchMark;
      'industry-reports.rep-search-volume-analysis': IndustryReportsRepSearchVolumeAnalysis;
      'industry-reports.rep-strategy': IndustryReportsRepStrategy;
      'industry-reports.rep-tech-bench-mark': IndustryReportsRepTechBenchMark;
      'industry-reports.snapshot': IndustryReportsSnapshot;
      'industry-reports.table': IndustryReportsTable;
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
      'section.ind-banner': SectionIndBanner;
      'section.ind-digital-marketing': SectionIndDigitalMarketing;
      'section.ind-growth': SectionIndGrowth;
      'section.ind-objectives': SectionIndObjectives;
      'section.ind-results': SectionIndResults;
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
