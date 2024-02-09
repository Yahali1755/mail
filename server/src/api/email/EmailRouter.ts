import express from "express"

import { findEntityById, findPaginatedEntities } from "../../common/queries";
import { EmailDocument, EmailModel } from "../../models/Email";
import { EmailMapper } from "./EmailMapper";
import { sendEntity, sendPaginatedEntities, sendSuccess } from "../../common/responses";
import { mapBodyToEntity } from "../../common/mapping";
import { deleteEntity, insertEntity, updateEntity } from "../../common/updates";
import { convertEmailQueryParams, prepareEmailForInsert } from "./email-handlers";
import { EmailQueryParameters } from "@mail/common";

const router = express.Router();
const mapper = new EmailMapper()

const insertEmail = insertEntity<EmailDocument>(EmailModel)
const updateEmail = updateEntity<EmailDocument>(EmailModel)
const deleteEmail = deleteEntity<EmailDocument>()
const findEmails = findPaginatedEntities<EmailDocument, EmailQueryParameters>(EmailModel, convertEmailQueryParams)

router.get('/',
    findEmails,
    sendPaginatedEntities(mapper)
)

router.post('/',
    mapBodyToEntity(mapper),
    prepareEmailForInsert,
    insertEmail,
    sendEntity(mapper)
)

router.put('/:id',
    mapBodyToEntity(mapper),
    updateEmail,
    sendEntity(mapper)
)

router.delete('/:id',
    findEntityById(EmailModel),
    deleteEmail,
    sendSuccess
)

export default {
    router,
    path: "/email"
};