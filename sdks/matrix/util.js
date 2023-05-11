'use strict'

function getOS(variant) {
    return variant.container_name ? variant.container_name :variant.os
}

module.exports = {
    getOS
}