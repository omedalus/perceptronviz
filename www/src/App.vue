<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<template>
  <Header></Header>

  <main>
    <div class="hero mainblock">
      <p>Humans are good at visual perception, and your screen is a visual medium.</p>
    </div>
  </main>

  <div>barrrrrr foooo weeee</div>

  <div class="explando-essay mainblock">
    <div class="explanation">
      <p>
        A <a href="https://en.wikipedia.org/wiki/Perceptron"><em>perceptron</em></a> is the
        ancestral version of modern machine learning architectures. In fact, the
        <a href="https://en.wikipedia.org/wiki/Artificial_neural_network"
          >artificial neural networks</a
        >
        that we use today throughout the world of artificial intelligence &mdash; from
        <a href="https://www.mathworks.com/discovery/deep-learning.html">Deep Learning </a>
        to <a href="https://stablediffusionweb.com/"> image generation </a> to
        <a href="https://openai.com/blog/chatgpt">Large Language Models (LLMs)</a>
        &mdash; all derive directly from the perceptron. In fact, modern neural networks are often
        called
        <a href="https://en.wikipedia.org/wiki/Multilayer_perceptron"> "multilayer perceptrons"</a>.
        The perceptron is a very simple algorithm, and understanding it will help you understand how
        today's extraordinary AIs, like <a href="https://chat.openai.com/chat">ChatGPT</a> or
        <a href="https://www.midjourney.com/home/">Midjourney</a>, work on a fundamental level.
      </p>

      <div class="explando-photo explando-photo-right">
        <a
          href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
        >
          <img src="@/assets/img/rosenblatt-wiring-perceptron.jpg" />
        </a>
        <div class="caption">
          Frank Rosenblatt at age 32, 1960, wiring the Mark 1 Perceptron. Read more about
          <a
            href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
            >Rosenblatt's contributions to AI in this article from Cornell University.
          </a>
          (Photo courtesey of Wikimedia Commons.)
        </div>
      </div>

      <p>
        Perceptrons were first invented "on paper" by
        <a href="https://www.britannica.com/biography/Warren-S-McCulloch"
          >neuroscientist Warren S. McCulloch</a
        >
        and
        <a href="https://www.britannica.com/biography/Walter-Pitts">mathematician Walter Pitts</a>
        in 1943. (This was two years before the first true computer,
        <a href="https://www.computerhistory.org/revolution/birth-of-the-computer/4/78">the ENIAC</a
        >, even came online!) The concept of the perceptron came from observations about the wiring
        patterns of neurons in human and animal brains &mdash; specifically, the
        <a href="https://thedecisionlab.com/reference-guide/neuroscience/hebbian-learning"
          >Hebbian learning rule</a
        >, which tells us that neurons that fire simultaneously tend to develop stronger connections
        to one another. An early AI pioneer, a psychologist named Frank Rosenblatt, using
        engineering techniques that were called "cybernetics" at the time, built the first
        electronic perceptron in 1958 out of analog hardware using self-turning motorized knobs.
      </p>
      <p>
        As the world's first machine capable of "learning", the perceptron caused a storm of
        inspiration in both scientific and cultural circles. The ubiquitous depiction of whirring,
        clacking sentient robots in
        <a href="https://www.flickchart.com/charts.aspx?genre=cyborg+/+android+/+robot&decade=1960"
          >movies and TV from the 1960s</a
        >, with electronic brains made of relays and vacuum tubes, was due in no small part to the
        incredible achievements that AI engineers were demonstrating in the real world. The
        perceptron could perform tasks that many had considered impossible for a machine to do, such
        as <a href="https://www.techtarget.com/whatis/definition/perceptron">recognize images</a>,
        <a href="http://neuralnetworksanddeeplearning.com/chap1.html">read handwriting</a>, and
        eventually
        <a
          href="https://towardsdatascience.com/the-1958-perceptron-as-a-breast-cancer-classifier-672556186156"
          >potentially diagnose cancer</a
        >.
        <a href="http://beamlab.org/deeplearning/2017/02/23/deep_learning_101_part1.html"
          >Rosenblatt himself famously declared</a
        >, "[The perceptron is] the embryo of an electronic computer that [the Navy] expects will be
        able to walk, talk, see, write, reproduce itself and be conscious of its existence."
      </p>
      <p>
        Unfortunately, this whirlwind of excitement proved immature. In the late 1960s, it was
        becoming apparent that the perceptron could only learn a very specific format of problems
        &mdash; ones that exhibited a mathematical property called
        <a
          href="https://subscription.packtpub.com/book/big-data-and-business-intelligence/9781788830577/2/ch02lvl1sec26/linear-separability"
          >linear separability</a
        >. If a pattern recognition assignment couldn't be expressed in linearly separable terms,
        then a perceptron was simply mathematically incapable of ever learning the pattern, no
        matter how many neurons the perceptron had and no matter how many example cases it was
        shown.
      </p>
      <p>
        A 1969 book called simply
        <a href="https://mitpress.mit.edu/9780262630221/perceptrons/"><em>Perceptrons</em></a
        >, by Marvin Minsky and Seymore Papert, gave a rigorous and elegant proof of the
        perceptron's limitations &mdash; a proof so straightforward, in fact, that many researchers
        were shocked and frankly embarrassed that the perceptron's shortcomings weren't obvious to
        them the whole time.
      </p>

      <div class="explando-photo explando-photo-left">
        <a
          href="https://news.cornell.edu/stories/2019/09/professors-perceptron-paved-way-ai-60-years-too-soon"
        >
          <img src="@/assets/img/rosenblatt-cameras.jpg" />
        </a>
        <div class="caption">
          Frank Rosenblatt working on automated image recognition, attaching a camera system to his
          Mark 1 Perceptron at Cornell University. (Photo courtesey of Wikimedia Commons.)
        </div>
      </div>

      <p>
        Minsky and Papert's book had a profound &mdash; and some would even say
        <em>catastrophic</em> &mdash; influence on the history of artificial intelligence.
      </p>

      <p>
        On the one hand, this revelation devastated the AI community. Research into
        <a href="https://www.britannica.com/technology/connectionism-artificial-intelligence"
          >"connectionist" approaches to AI</a
        >
        &mdash; those based on or inspired by the concepts of neural connectivity from biological
        brains &mdash; practically disappeared overnight. Through the 1970s and early 1980s, partly
        due to
        <a href="https://dougenterprises.com/perceptron-history/">Minsky's influence</a>
        research instead focused on the development of
        <a href="https://en.wikipedia.org/wiki/Symbolic_artificial_intelligence"
          >symbolic artificial intelligence</a
        >, which included
        <a href="https://en.wikipedia.org/wiki/Expert_system">expert systems</a> and
        <a href="https://en.wikipedia.org/wiki/Automated_theorem_proving"
          >automated mathematical theorem-provers</a
        >. These systems could explicitly mimic human decision-making and possibly even exceed human
        performance, but they had very little means of adapting to novel situations, and were
        incapable of doing anything that their human programmers didn't explicitly tell them to.
        During this time, connectionism was generally regarded as naive and perhaps childish &mdash;
        but at the same time, practically nobody believed that expert systems would ever lead to
        "self-aware" machinery. This was known as the
        <a href="https://builtin.com/artificial-intelligence/ai-winter">AI winter</a>, and during
        this time many people both in industry and in culture came to believe that the development
        of a "true" machine intelligence was ultimately impossible.
      </p>
      <p>
        On the other hand, Minsky and Papert left a glimmering promise amidst this flood of despair.
        In the book, they posited that, even though individual perceptrons had this limitation of
        linear separability, <em>combined stacks</em> or <em>layers</em> of perceptrons would not
        &mdash; if only the perceptron's elementary training procedure could somehow be adapted to
        operate through a series of layers. This adaptation came very quickly, when, in 1970, a
        Finnish graduate student named
        <a href="https://people.idsia.ch/~juergen/who-invented-backpropagation-2014.html"
          >Seppo Linnainmaa</a
        >
        published an algorithm called "backpropagation". Though simple in concept and honestly
        fairly easy for a trained graduate-level mathematician, the equations behind backpropagation
        are far beyond the grasp of laymen, requiring the ability to solve partial differential
        equations in arbitrarily high-dimensional hyperspaces. (If you''d like to grasp what the
        equations are doing, I recommend you start with
        <a href="https://www.youtube.com/watch?v=Ilg3gGewQ5U"
          >this excellent video series by 3Blue1Brown</a
        >
        (no affiliation)). Fortunately, though backpropagation's equations may be difficult to
        <em>understand</em>, they are relatively easy to <em>implement</em>. (If you have some
        programming expertise and want to understand how to turn the equations into code,
        <a href="https://neptune.ai/blog/backpropagation-algorithm-in-neural-networks-guide"
          >Neptune.ai (no affiliation) has a detailed lesson.</a
        >) Indeed, the backpropagation algorithm, which makes
        <a href="https://www.ibm.com/topics/deep-learning">Deep Learning</a> possible, remains the
        bedrock of neural network technology to this day. Though we've
        <a
          href="https://www.analyticsvidhya.com/blog/2021/06/the-challenge-of-vanishing-exploding-gradients-in-deep-neural-networks/"
        >
          encountered corner-cases
        </a>
        and developed
        <a href="https://www.mygreatlearning.com/blog/relu-activation-function/"
          >optimizations and simplifications</a
        >, the backpropagation algorithm itself remains essentially unchanged from Linnainmaa's
        original formulation. With ever-increasing hardware capabilities and
        <a
          href="https://towardsdatascience.com/what-is-a-gpu-and-do-you-need-one-in-deep-learning-718b9597aa0d"
        >
          parallelization techniques</a
        >, our computers run the computationally expensive backpropagation algorithm
        <a href="https://towardsdatascience.com/language-model-scaling-laws-and-gpt-3-5cdc034e67bb"
          >at scales scarcely imaginable</a
        >
        to the engineers of 1943, and Frank Rosenblatt's prophecy that his analog contraption would
        be the "embryo" of sentient machinery may yet come to fruition &mdash; and soon.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mainblock {
  max-width: 1024px;
  padding: 0 2em;
  margin: auto;
}

.explando-photo {
  &.explando-photo-right {
    float: right;
    margin: 1em 3em 2em;
    margin-right: 0;
  }

  &.explando-photo-left {
    float: left;
    margin: 1em 3em 2em;
    margin-left: 0;
  }

  width: 15em;
  max-width: 33vw;

  img {
    width: 100%;
  }

  .caption {
    font-size: 0.875rem;
    font-style: italic;
    color: #aaa;
  }
}

.explando-essay {
  padding-bottom: 2em;
}
</style>
