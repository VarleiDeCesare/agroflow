type TemplateVariables = {
  [key: string]: string | number;
};

export class ParseMailDto {
  file: string;
  name: string;
  variables: TemplateVariables;
}
