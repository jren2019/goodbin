import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }

    // Basic Markdown parsing (simplified for this example)
    let html = value;

    // Headers
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    html = html.replace(/^##### (.*$)/gm, '<h5>$1</h5>');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*)\*/gm, '<em>$1</em>');

    // Lists
    html = html.replace(/^\* (.*$)/gm, '<ul><li>$1</li></ul>');

    // Fix consecutive lists
    html = html.replace(/<\/ul>\n<ul>/gm, '');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>');

    // Line breaks
    html = html.replace(/\n/gm, '<br>');

    // Paragraphs - wrap content not inside a block element
    html = '<p>' + html.replace(/<\/h[1-5]><br>/g, '</h$1>').replace(/<br><h/g, '</p><h').replace(/<br><\/p>/g, '</p>') + '</p>';
    html = html.replace(/<p><\/p>/g, '');

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
