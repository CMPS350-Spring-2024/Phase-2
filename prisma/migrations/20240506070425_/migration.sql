/*
  Warnings:

  - A unique constraint covering the columns `[question,answer]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Question_question_answer_key" ON "Question"("question", "answer");
