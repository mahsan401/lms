'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Permissions', [
        //Front office Module
        {module: "Front Office",feature:"Admission", name: 'view-admission',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Admission", name: 'create-admission',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Admission", name: 'edit-admission',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Admission", name: 'delete-admission',createdAt: new Date(), updatedAt: new Date()},

        {module: "Front Office",feature:"Visitor Book", name: 'view-visitor-book',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Visitor Book", name: 'create-visitor-book',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Visitor Book", name: 'edit-visitor-book',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Visitor Book", name: 'delete-visitor-book',createdAt: new Date(), updatedAt: new Date()},

        {module: "Front Office",feature:"Phone Call Log", name: 'view-phone-call-log',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Phone Call Log", name: 'create-phone-call-log',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Phone Call Log", name: 'edit-phone-call-log',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Phone Call Log", name: 'delete-phone-call-log',createdAt: new Date(), updatedAt: new Date()},

        {module: "Front Office",feature:"Postal Dispatch", name: 'view-postal-dispatch',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Postal Dispatch", name: 'create-postal-dispatch',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Postal Dispatch", name: 'edit-postal-dispatch',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Postal Dispatch", name: 'delete-postal-dispatch',createdAt: new Date(), updatedAt: new Date()},

        {module: "Front Office",feature:"Postal Receive", name: 'view-postal-receive',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Postal Receive", name: 'create-postal-receive',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Postal Receive", name: 'edit-postal-receive',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Postal Receive", name: 'delete-postal-receive',createdAt: new Date(), updatedAt: new Date()},

        {module: "Front Office",feature:"Complain", name: 'view-complain',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Complain", name: 'create-complain',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Complain", name: 'edit-complain',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Complain", name: 'delete-complain',createdAt: new Date(), updatedAt: new Date()},

        {module: "Front Office",feature:"Setup Front Office", name: 'view-setup-front-office',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Setup Front Office", name: 'create-setup-front-office',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Setup Front Office", name: 'edit-setup-front-office',createdAt: new Date(), updatedAt: new Date()},
        {module: "Front Office",feature:"Setup Front Office", name: 'delete-setup-front-office',createdAt: new Date(), updatedAt: new Date()},

        //Student Information
        {module: "Student Information",feature:"Student", name: 'view-student',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student", name: 'create-student',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student", name: 'edit-student',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student", name: 'delete-student',createdAt: new Date(), updatedAt: new Date()},

        {module: "Student Information",feature:"Import Student", name: 'view-import-student',createdAt: new Date(), updatedAt: new Date()},

        {module: "Student Information",feature:"Disabled Student", name: 'view-disabled-student',createdAt: new Date(), updatedAt: new Date()},

        {module: "Student Information",feature:"Multi Class Student", name: 'view-multi-class-student',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Multi Class Student", name: 'create-multi-class-student',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Multi Class Student", name: 'edit-multi-class-student',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Multi Class Student", name: 'delete-multi-class-student',createdAt: new Date(), updatedAt: new Date()},

        {module: "Student Information",feature:"Student Categories", name: 'view-student-categories',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student Categories", name: 'create-student-categories',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student Categories", name: 'edit-student-categories',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student Categories", name: 'delete-student-categories',createdAt: new Date(), updatedAt: new Date()},

        {module: "Student Information",feature:"Student House", name: 'view-student-house',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student House", name: 'create-student-house',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student House", name: 'edit-student-house',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Student House", name: 'delete-student-house',createdAt: new Date(), updatedAt: new Date()},

        {module: "Student Information",feature:"Disable Reason", name: 'view-disable-reason',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Disable Reason", name: 'create-disable-reason',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Disable Reason", name: 'edit-disable-reason',createdAt: new Date(), updatedAt: new Date()},
        {module: "Student Information",feature:"Disable Reason", name: 'delete-disable-reason',createdAt: new Date(), updatedAt: new Date()},



    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
