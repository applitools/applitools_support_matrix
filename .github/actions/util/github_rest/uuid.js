'use strict'
import * as crypto from "crypto"
export function uuid() {
    return crypto.randomUUID()
}
