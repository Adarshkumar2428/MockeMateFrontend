from textblob import TextBlob
from language_tool_python import LanguageTool


class SpellGrammarChecker:
    def __init__(self):
        self.spell_checker = TextBlob()
        self.grammar_checker = LanguageTool('en-US')

    def correct_text(self, text):
        # Correct spelling mistakes
        corrected_spelling = self.correct_spelling(text)

        # Correct grammar mistakes
        corrected_grammar = self.correct_grammar(corrected_spelling)

        return corrected_grammar

    def correct_spelling(self, text):
        return str(TextBlob(text).correct())

    def correct_grammar(self, text):
        matches = self.grammar_checker.check(text)
        corrected_text = text  # Initialize corrected text with original text

        # Iterate over grammar mistakes and apply corrections
        for mistake in reversed(matches):
            corrected_text = corrected_text[:mistake.fromx] + mistake.replacements[0] + corrected_text[mistake.tox:]

        return corrected_text




