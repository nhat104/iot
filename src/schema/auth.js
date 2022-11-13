/**
 * @openapi
 * components:
 *  schemas:
 *    SignUpInput:
 *      type: object
 *      properties:
 *        fullName:
 *          type: string
 *        username:
 *          type: string
 *        password:
 *          type: string
 *        address:
 *          type: string
 *        phone:
 *          type: string
 *        birthday:
 *          type: string
 *    SignUpResponse:
 *      type: object
 *      properties:
 *        message:
 *          default: "Created"
 *        status:
 *          default: 201
 *        data:
 *          type: object
 *          properties:
 *            user:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                username:
 *                  type: string
 *                fullName:
 *                  type: string
 *                address:
 *                  type: string
 *                phone:
 *                  type: string
 *                birthday:
 *                  type: string
 *                role:
 *                  type: string
 *    LoginInput:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: string
 *    LoginResponse:
 *      type: object
 *      properties:
 *        message:
 *          default: "Success"
 *        status:
 *          default: 200
 *        data:
 *          type: object
 *          properties:
 *            user:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                username:
 *                  type: string
 *                fullName:
 *                  type: string
 *                address:
 *                  type: string
 *                phone:
 *                  type: string
 *                birthday:
 *                  type: string
 *                role:
 *                  type: string
 */
