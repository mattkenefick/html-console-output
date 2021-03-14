
import './style.css';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const MAXITEMSINOBJECTPREVIEW = 3;
const MAXITEMSINARRAYPREVIEW = 5;

const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.innerHTML = '<button class="close-button"><svg width="15" height="15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.995 511.995" style="enable-background:new 0 0 511.995 511.995;" xml:space="preserve"> <path d="M437.126,74.939c-99.826-99.826-262.307-99.826-362.133,0C26.637,123.314,0,187.617,0,256.005 s26.637,132.691,74.993,181.047c49.923,49.923,115.495,74.874,181.066,74.874s131.144-24.951,181.066-74.874 C536.951,337.226,536.951,174.784,437.126,74.939z M409.08,409.006c-84.375,84.375-221.667,84.375-306.042,0 c-40.858-40.858-63.37-95.204-63.37-153.001s22.512-112.143,63.37-153.021c84.375-84.375,221.667-84.355,306.042,0 C493.435,187.359,493.435,324.651,409.08,409.006z"/><path d="M341.525,310.827l-56.151-56.071l56.151-56.071c7.735-7.735,7.735-20.29,0.02-28.046 c-7.755-7.775-20.31-7.755-28.065-0.02l-56.19,56.111l-56.19-56.111c-7.755-7.735-20.31-7.755-28.065,0.02 c-7.735,7.755-7.735,20.31,0.02,28.046l56.151,56.071l-56.151,56.071c-7.755,7.735-7.755,20.29-0.02,28.046 c3.868,3.887,8.965,5.811,14.043,5.811s10.155-1.944,14.023-5.792l56.19-56.111l56.19,56.111 c3.868,3.868,8.945,5.792,14.023,5.792c5.078,0,10.175-1.944,14.043-5.811C349.28,331.117,349.28,318.562,341.525,310.827z"/></svg></button>';
    wrapper.classList.add('state-collapsed');
    wrapper.classList.add('console-block-wrapper');

const closeButton: HTMLButtonElement = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '<svg width="15" height="15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.995 511.995" style="enable-background:new 0 0 511.995 511.995;" xml:space="preserve"> <path d="M437.126,74.939c-99.826-99.826-262.307-99.826-362.133,0C26.637,123.314,0,187.617,0,256.005 s26.637,132.691,74.993,181.047c49.923,49.923,115.495,74.874,181.066,74.874s131.144-24.951,181.066-74.874 C536.951,337.226,536.951,174.784,437.126,74.939z M409.08,409.006c-84.375,84.375-221.667,84.375-306.042,0 c-40.858-40.858-63.37-95.204-63.37-153.001s22.512-112.143,63.37-153.021c84.375-84.375,221.667-84.355,306.042,0 C493.435,187.359,493.435,324.651,409.08,409.006z"/><path d="M341.525,310.827l-56.151-56.071l56.151-56.071c7.735-7.735,7.735-20.29,0.02-28.046 c-7.755-7.775-20.31-7.755-28.065-0.02l-56.19,56.111l-56.19-56.111c-7.755-7.735-20.31-7.755-28.065,0.02 c-7.735,7.755-7.735,20.31,0.02,28.046l56.151,56.071l-56.151,56.071c-7.755,7.735-7.755,20.29-0.02,28.046 c3.868,3.887,8.965,5.811,14.043,5.811s10.155-1.944,14.023-5.792l56.19-56.111l56.19,56.111 c3.868,3.868,8.945,5.792,14.023,5.792c5.078,0,10.175-1.944,14.043-5.811C349.28,331.117,349.28,318.562,341.525,310.827z"/></svg>';
    wrapper.appendChild(closeButton);

const output: HTMLDivElement = document.createElement('div');
    output.classList.add('console-block');
    wrapper.appendChild(output);

const oldLog: Function = window.console.log;

closeButton.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();

    wrapper.classList.add('state-collapsed');
}

wrapper.onclick = function(e) {
    if (wrapper.classList.contains('state-collapsed')) {
        wrapper.classList.remove('state-collapsed');
    }
}

window.console.log = function (...items: any[]) {
    oldLog.apply(this, arguments);

    const outputLine: HTMLDivElement = document.createElement('div');
        outputLine.classList.add('console-line');
        outputLine.innerHTML = '<time>' + new Date().toLocaleTimeString() + '</time>';

        output.appendChild(outputLine);

    for (let item of items) {
        outputLine.appendChild(createItem(item, true, false));
    }
}

window.onerror = (message, source, lineno, colno, error): void => {
    const outputLine: HTMLDivElement = document.createElement('div');
    outputLine.classList.add('console-line');
    outputLine.classList.add('error');
    output.appendChild(outputLine);

    let errorMessage: HTMLSpanElement = document.createElement('span');
    errorMessage.innerHTML = <string>message;
    outputLine.appendChild(errorMessage);
 }

ifDomReady(wrapper);

/* poll DOM in stead of using onload event, because JSFiddle will overwrite onload event handler */
function ifDomReady(consoleBlock: HTMLDivElement): void {
    if (document.getElementById('html-console-output') ||
        document.getElementsByTagName('body').length > 0) {
            if(document.getElementById('html-console-output')) {
                document.getElementById('html-console-output')!.appendChild(consoleBlock);
            }
            else {
                document.getElementsByTagName('body')[0].appendChild(consoleBlock);
            }
    }
    else {
        setTimeout((): void => { ifDomReady(output); }, 50);
    }
}

/**
 * Serialize an object or primitive to HTML
 * @param o The object to be serialized
 * @param baseLevel true if used as top-level element, false when used in recursive child serialization
 * @param inline true if used in preview for Array or Object
 */
function createItem(o: any, baseLevel: boolean, inline: boolean): HTMLDivElement {
    let item: HTMLDivElement = document.createElement('div');

    //
    output.scrollTop = output.scrollHeight;

    //
    item.classList.add('console-item');

    switch (typeof o) {
        case 'string':
            if (baseLevel) {
                item.innerHTML = o;
            } else {
                item.style.color = '#ed5c65';
                item.innerHTML = `"${o}"`;
            }
            break;

        case 'number':
        case 'boolean':
            item.style.color = '#249d7f';
            item.innerHTML = o.toString();
            break;

        case 'object':
            if (o === null) {
                item.style.color = '#777';
                item.innerHTML = 'null';
            } else {
                item.style.color = '#2795ee';
                if (inline) {
                    item.innerHTML = '{&mldr;}';
                }
                else {
                    item.appendChild(createObjectItem(o));
                }
            }
            break;

        case 'function':
            item.style.color = 'rgb(238, 151, 39)';
            item.innerHTML = 'function()';
            break;

        case 'undefined':
            item.style.color = '#777';
            item.innerHTML = 'undefined';
            break;
    }

    return item;
}

function createObjectItem(o: any): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const id: string = 'u' + Math.random().toString(36).substr(2, 8);
    const toggle: HTMLInputElement = document.createElement('input');
    const label: HTMLLabelElement = document.createElement('label');
    const labelText: HTMLSpanElement = document.createElement('span');
    const labelTextShort: HTMLSpanElement = document.createElement('span');
    const content: HTMLDivElement = document.createElement('div');
    const contentInner: HTMLDivElement = document.createElement('div');

    content.classList.add('collapsible-content');
    contentInner.classList.add('content-inner');

    toggle.classList.add('toggle');
    toggle.type = 'checkbox';
    toggle.id = id;

    labelText.classList.add('label-text');
    labelTextShort.classList.add('label-text-short');

    if (o instanceof Array) {
        labelText.innerHTML = 'Array';
        labelText.appendChild(createLengthSpan(o));
        labelText.appendChild(createArrayPreview(o));

        labelTextShort.innerHTML = '[&mldr;]';
        labelTextShort.appendChild(createLengthSpan(o));
    } else {
        labelTextShort.innerHTML = '{&mldr;}';

        let prototype: any = Object.getPrototypeOf(o);
        labelText.innerHTML = prototype && prototype.constructor ? prototype.constructor.name : 'Object';
        labelText.innerHTML += ' ';
        labelText.appendChild(createObjectPreview(o));
    }

    label.classList.add('label-toggle');
    label.setAttribute('for', id);
    label.appendChild(labelText);
    label.appendChild(labelTextShort);

    for (let property in o) {
        if(Object.getOwnPropertyNames(o).indexOf(property) == -1) continue;

        const serializedProperty: HTMLDivElement = document.createElement('div');
        serializedProperty.classList.add('console-property');
        serializedProperty.innerHTML = property + ': ';
        serializedProperty.appendChild(createItem(o[property], false, false));
        contentInner.appendChild(serializedProperty);
    }

    for (let property of getHiddenProperties(o)) {
        const serializedProperty: HTMLDivElement = document.createElement('div');
        serializedProperty.classList.add('console-property');
        let lockIcon: HTMLElement = <HTMLElement>icon(faLock).node[0];
        lockIcon.style.color = '#aaa';
        serializedProperty.appendChild(lockIcon);
        serializedProperty.innerHTML += ` ${property}: `;
        serializedProperty.appendChild(createItem(o[property], false, false));
        contentInner.appendChild(serializedProperty);
    }

    let proto: any = Object.getPrototypeOf(o);
    if (proto !== null) {
        const serializedProperty: HTMLDivElement = document.createElement('div');
        serializedProperty.classList.add('console-property');
        serializedProperty.style.color = '#777';
        serializedProperty.innerHTML = '(prototype): ';
        serializedProperty.appendChild(createItem(proto, false, false));
        contentInner.appendChild(serializedProperty);
    }

    content.appendChild(contentInner);

    fragment.appendChild(toggle);
    fragment.appendChild(label);
    fragment.appendChild(content);

    return fragment;
}

function createLengthSpan(a: any[]): HTMLSpanElement {
    const span: HTMLSpanElement = document.createElement('span');
    span.style.color = '#aaa';
    span.innerHTML = `(${a.length}) `;

    return span;
}

function createObjectPreview(o: any): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const span: HTMLSpanElement = document.createElement('span');

    span.innerHTML = '{';

    let index: number = 0;
    for (let property in o) {
        span.innerHTML += ` ${property}: `;
        span.appendChild(createItem(o[property], false, true));

        if (index >= MAXITEMSINOBJECTPREVIEW - 1 || index == Object.keys(o).length - 1) {
            break;
        }

        span.innerHTML += ',';
        index++;
    }

    if (Object.keys(o).length > MAXITEMSINOBJECTPREVIEW) {
        span.innerHTML += ', &mldr;';
    }

    span.innerHTML += ' }';

    fragment.appendChild(span);
    return fragment;
}

function createArrayPreview(a: any[]): DocumentFragment {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const span: HTMLSpanElement = document.createElement('span');

    span.innerHTML = '[';

    for (let i = 0; i < MAXITEMSINARRAYPREVIEW && i < a.length; i++) {
        span.innerHTML += ' ';
        span.appendChild(createItem(a[i], false, true));

        if (i < a.length - 1 && i < MAXITEMSINARRAYPREVIEW - 1) {
            span.innerHTML += ',';
        }
    }

    if (a.length > MAXITEMSINARRAYPREVIEW) {
        span.innerHTML += ', &mldr;';
    }

    span.innerHTML += ' ]';

    fragment.appendChild(span);
    return fragment;
}

function getHiddenProperties(o: any): string[] {
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
    */

    let all: string[] = Object.getOwnPropertyNames(o);
    let enumOnly: string[] = Object.keys(o);

    return all.filter((key: string): boolean => {
        let index: number = enumOnly.indexOf(key);
        if (index == -1) {
            return true;
        }
        else {
            return false;
        }
    });
}
