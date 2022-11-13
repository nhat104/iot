/**
 * @openapi
 * components:
 *  schemas:
 *    CheckInput:
 *      type: object
 *      properties:
 *        userId:
 *          type: number
 *          default: 1
 *        time:
 *          type: string
 *          default: 09:00
 *        date:
 *          type: string
 *          default: 2022-10-07
 *    CheckResponse:
 *      type: object
 *      properties:
 *        message:
 *          default: "Success"
 *        status:
 *          default: 200
 *        data:
 *          type: object
 *          properties:
 *            id:
 *              type: integer
 *            userId:
 *              type: number
 *            time:
 *              type: string
 *              default: 09:00
 *            date:
 *              type: string
 *              default: 2022-10-07
 */
