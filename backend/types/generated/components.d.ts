import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_article_image_blocks';
  info: {
    displayName: 'ImageBlock';
    icon: 'picture';
  };
  attributes: {
    altText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    reference: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArticleImpactMessage extends Struct.ComponentSchema {
  collectionName: 'components_article_impact_messages';
  info: {
    displayName: 'ImpactMessage';
    icon: 'layout';
  };
  attributes: {
    author: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ArticleListItem extends Struct.ComponentSchema {
  collectionName: 'components_article_list_items';
  info: {
    displayName: 'ListItem';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArticleReference extends Struct.ComponentSchema {
  collectionName: 'components_article_references';
  info: {
    displayName: 'Reference';
    icon: 'link';
  };
  attributes: {
    citation: Schema.Attribute.Text & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface ArticleSection extends Struct.ComponentSchema {
  collectionName: 'components_article_sections';
  info: {
    displayName: 'Section';
    icon: 'layout';
  };
  attributes: {
    index: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ArticleTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_article_text_blocks';
  info: {
    displayName: 'TextBlock';
    icon: 'brush';
  };
  attributes: {
    body: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'article.image-block': ArticleImageBlock;
      'article.impact-message': ArticleImpactMessage;
      'article.list-item': ArticleListItem;
      'article.reference': ArticleReference;
      'article.section': ArticleSection;
      'article.text-block': ArticleTextBlock;
    }
  }
}
