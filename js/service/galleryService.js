'use strict';

const templatesTags = {
    1: ['politics', 'celebs'],
    2: ['dogs'],
    3: ['kids', 'dogs'],
    4: ['cats'],
    5: ['kids'],
    6: ['celebs'],
    7: ['kids'],
    8: ['celebs'],
    9: ['kids'],
    10: ['politics, celebs'],
    11: ['celebs'],
    12: ['celebs'],
    13: ['celebs'],
    14: ['celebs'],
    15: ['celebs'],
    16: ['celebs'],
    17: ['celebs', 'politics'],
}

function getTemplates(tag) {
    const relevantTemplates = []
    for (const template in templatesTags) {
        if (templatesTags[template].includes(tag) || tag === 'all') {
            relevantTemplates.push(template)
        }
    }
    return relevantTemplates
}