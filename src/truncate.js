angular.module('truncate', [])
    .filter('characters', function () {
        return function (input, chars, lang, breakOnWord) {
            var lang = lang || 'en'
            if (lang != 'en'){
                chars = Math.floor(chars / 2.5);
            }
            if (isNaN(chars)) return input;
            if (chars <= 0) return '';
            // strip images
            input = input.replace(/<img(?:.*?)>/g,'')
            // strip tables
            input = input.replace(/<table>(?:.*?)table>/g,'')
            // strip captions
            input = input.replace(/<em>(?:.*?)>/g,'')
            // strip horizontal rules
            // input = input.replace(/<hr>/g,'')
            // strong text
            input = input.replace(/<strong>(?:.*?)strong>/g,'')
            // Strip out HTML
            input = input.replace(/<[^>]*>/g,'')
            // Strip out Dead Tags
            // input = input.replace(/<\/p><p>/g,'')
            if (input && input.length > chars) {

                input = input.substring(0, chars);

                if (!breakOnWord && lang == 'en') {
                    var lastspace = input.lastIndexOf(' ');
                    //get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                } else {
                    while(input.charAt(input.length-1) === ' '){
                        input = input.substr(0, input.length -1);
                    }
                }
                return input + '...';
            }
            return input;
        };
    })
    .filter('words', function () {
        return function (input, words) {
            if (isNaN(words)) return input;
            if (words <= 0) return '';
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '...';
                }
            }
            return input;
        };
    });
