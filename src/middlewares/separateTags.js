const separateTags = (tags) => {
    tags = tags.replace(/[.,#!$%;:{}=\-_`~()]/g, ' ');
    tags = tags.toLowerCase();
    tags = tags.split(' ');
    tags = tags.filter((tag) => tag !== '');
    tags = tags.map(tag => '#' + tag );
    return tags;
}

export default separateTags;