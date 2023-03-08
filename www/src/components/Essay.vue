<script setup lang="ts">
import linkBeyondRegressionPDF from '@/assets/PJW_thesis_Beyond_Regression_1974.pdf';
import linkReLUPDF from '@/assets/glorot11a-deep-sparse-ReLU-2011.pdf';
import linkRosenblatt1958PDF from '@/assets/rosenblatt-perceptron-probabilistic-1958.pdf';
import linkRosenblatt1957PDF from '@/assets/rosenblatt-perceptron-perceiving-1957.pdf';
import linkHinton1986 from '@/assets/rumelhart-hinton-williams-backprop-1986.pdf';
import linkKelley1960 from '@/assets/1960-kelley.pdf';

import { ref, onMounted } from 'vue';

const theDiv = ref();

onMounted(() => {
  const elemDiv = theDiv.value as HTMLElement;
  if (!elemDiv) {
    return;
  }
  // Make all hyperlinks open in a new window.
  [...elemDiv.querySelectorAll('a')].forEach((a) => {
    a.target = '_blank';
  });
});
</script>

<template>
  <div class="explando-essay-component" ref="theDiv">
    <p>
      A <a href="https://en.wikipedia.org/wiki/Perceptron"><em>perceptron</em></a> is the ancestral
      form of modern machine learning systems. The
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
      Perceptrons were first developed "on paper" by
      <a href="https://www.britannica.com/biography/Warren-S-McCulloch"
        >neuroscientist Warren S. McCulloch</a
      >
      and
      <a href="https://www.britannica.com/biography/Walter-Pitts">mathematician Walter Pitts</a>
      in 1943. (This was two years before the first true computer,
      <a href="https://www.computerhistory.org/revolution/birth-of-the-computer/4/78">the ENIAC</a>,
      even came online!) The concept of the perceptron came from observations about the wiring
      patterns of neurons in human and animal brains &mdash; specifically, the
      <a href="https://thedecisionlab.com/reference-guide/neuroscience/hebbian-learning"
        >Hebbian learning rule</a
      >, which tells us that neurons that fire simultaneously tend to develop stronger connections
      to one another. An early AI pioneer, a
      <a href="http://csis.pace.edu/~ctappert/srd2011/rosenblatt-contributions.htm"
        >psychologist named Frank Rosenblatt</a
      >, using an engineering paradigm of corrective feedback signals that came to be called
      <a
        href="https://shahaliyev.medium.com/introduction-to-deep-learning-how-cybernetics-became-deep-learning-e46f8101053"
      >
        "cybernetics" </a
      >, built the <a :href="linkRosenblatt1958PDF"> first electronic perceptron in 1958</a>. His
      invention was an analog machine comprised of self-adjusting "neuronal units" &mdash; each of
      which consisted of a motor that turned its own resistance dial to set its connection weight.
    </p>
    <p>
      As the world's first
      <a :href="linkRosenblatt1957PDF"> machine capable of "learning"</a>, the perceptron caused a
      storm of inspiration in both scientific and cultural circles. The ubiquitous depiction of
      whirring, clacking sentient robots in
      <a href="https://www.flickchart.com/charts.aspx?genre=cyborg+/+android+/+robot&decade=1960"
        >movies and TV from the 1960s</a
      >, with electronic brains made of relays and vacuum tubes, was due in no small part to the
      incredible achievements that AI engineers were demonstrating in the real world. The perceptron
      could perform tasks that many had considered impossible for a machine to do, such as
      <a href="https://www.techtarget.com/whatis/definition/perceptron">recognize images</a>,
      <a href="http://neuralnetworksanddeeplearning.com/chap1.html">read handwriting</a>, and
      eventually
      <a
        href="https://towardsdatascience.com/the-1958-perceptron-as-a-breast-cancer-classifier-672556186156"
        >diagnose cancer</a
      >.
      <a href="http://beamlab.org/deeplearning/2017/02/23/deep_learning_101_part1.html"
        >Rosenblatt himself famously declared</a
      >, "[The perceptron is] the embryo of an electronic computer that [the Navy] expects will be
      able to walk, talk, see, write, reproduce itself and be conscious of its existence."
    </p>
    <p>
      Unfortunately, this whirlwind of excitement proved immature. In the late 1960s, it was
      becoming apparent that the perceptron could only learn a very specific format of problems:
      ones that exhibited a mathematical property called
      <a
        href="https://subscription.packtpub.com/book/big-data-and-business-intelligence/9781788830577/2/ch02lvl1sec26/linear-separability"
        >linear separability</a
      >. This constraint meant that a perceptron could only identify a pattern as long as that
      pattern could always strictly be described by the sum of its parts &mdash; that is, as long as
      no <em>combination</em> of individual examples of the pattern constitute an
      <em>exception</em> to it. For instance, if a perceptron were being trained on lists of food
      ingredients to recognize the property of "deliciousness", then it could learn that chocolate
      and tuna are each individually delicious, but it could never discern that the
      <em>combination</em> of chocolate and tuna isn't the sum of chocolate's and tuna's individual
      deliciousness values. (This example showcases the concept of an
      <a href="https://dev.to/jbahire/demystifying-the-xor-problem-1blk">"exclusive OR", or "XOR"</a
      >, operation, which became the quintessential demonstration of something that a perceptron
      cannot do.) If a pattern recognition assignment couldn't be expressed in linearly separable
      terms, then a perceptron was simply mathematically incapable of ever learning the pattern
      &mdash; no matter how many neurons it had, no matter how densely connected it was, and no
      matter how many training examples it was shown.
    </p>
    <p>
      In 1969, legendary AI scientist
      <a href="https://en.wikipedia.org/wiki/Marvin_Minsky">Marvin Minsky</a>,

      <a
        href="https://medium.com/codex/the-perceptron-and-the-rivalry-between-frank-rosenblatt-and-marvin-minsky-e68fb3e0e3b6"
      >
        a lifelong rival of Rosenblatt since boyhood</a
      >, co-authored a highly critical book with
      <a
        href="https://news.mit.edu/2016/seymour-papert-pioneer-of-constructionist-learning-dies-0801"
        >mathematician and educator (and eventual philanthropist) Seymour Papert</a
      >
      titled
      <a href="https://mitpress.mit.edu/9780262630221/perceptrons/"
        ><em>Perceptrons: An Introduction to Computational Geometry</em></a
      >. This book presented a rigorous and elegant proof of the perceptron's limitations &mdash; a
      proof so straightforward, in fact, that many researchers were shocked and frankly embarrassed
      that the perceptron's shortcomings weren't obvious to them the whole time.
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
      Minsky and Papert's book had a profound &mdash; arguably even
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
      <a href="https://dougenterprises.com/perceptron-history/">Minsky's advocacy</a>, research
      instead focused on the development of
      <a href="https://en.wikipedia.org/wiki/Symbolic_artificial_intelligence"
        >symbolic artificial intelligence</a
      >, which included <a href="https://en.wikipedia.org/wiki/Expert_system">expert systems</a> and
      <a href="https://en.wikipedia.org/wiki/Automated_theorem_proving"
        >automated mathematical theorem-provers</a
      >. These systems could explicitly mimic human decision-making and possibly even exceed human
      performance. However, they had very little means of adapting to novel situations, and were
      incapable of doing anything that their human programmers didn't explicitly tell them to.
      During this time, connectionism was generally regarded as naive and perhaps childish &mdash;
      but at the same time, practically nobody believed that expert systems would ever lead to
      "self-aware" machinery. This was known as the
      <a href="https://builtin.com/artificial-intelligence/ai-winter">AI winter</a>, and during this
      time many people both in industry and in culture came to believe that the development of a
      "true" machine intelligence was ultimately impossible.
    </p>

    <div class="explando-photo explando-photo-right">
      <a href="https://www.newyorker.com/magazine/1981/12/14/a-i">
        <img src="@/assets/img/Lives-MinskyNew.jpg" />
      </a>
      <div class="caption">
        <a href="https://www.newyorker.com/magazine/1981/12/14/a-i">Marvin Minsky</a>, co-founder of
        the
        <a
          href="https://capd.mit.edu/organizations/mit-computer-science-artificial-intelligence-lab/"
          >MIT AI Lab</a
        >, advocated a radically different approach to AI than Rosenblatt. He and
        <a href="https://en.wikipedia.org/wiki/Seymour_Papert">Seymour Papert</a>
        published
        <a href="https://mitpress.mit.edu/9780262630221/perceptrons/"><em>Perceptrons</em></a> in
        1969. This book crushed all faith in neural networks for an entire generation of
        researchers, but it also described the innovations that would need to take place &mdash; and
        ultimately <em>did</em> take place &mdash; to bring connectionist AI to fruition.
      </div>
    </div>

    <p>
      On the other hand, Minsky and Papert left a glimmer of hope amid this flood of despair. In the
      book, they posited that, even though individual perceptrons had this limitation of linear
      separability, <em>combined stacks</em> or <em>layers</em> of perceptrons would not. In a
      layered configuration, each layer of the machine could be trained to recognize groupings of a
      pattern's individual compoments, and then assign separate connection weights to the group
      independently from the weights of the original components. Per the above example of training a
      perceptron to learn the property of "deliciousness" in chocolate XOR tuna (that is, in
      chocolate <em>or</em> tuna <em>but not both</em>), the simultaneous activation of the two
      inputs representing "chocolate" and "tuna" could trigger the activation of a third implicit or
      "hidden" unit that represents "chocolate-AND-tuna". This "chocolate-AND-tuna" node could then
      have a strongly negative connection to the "deliciousness" output &mdash; so strong that it
      completely suppresses whatever positive activation might otherwise come from the sum of the
      two "chocolate" and "tuna" inputs individually.
    </p>
    <p>
      Unfortunately, the question still remained about how exactly to <em>train</em> a multilayered
      perceptron. Training a single-layered perceptron is easy &mdash; it simply involves increasing
      the weights of the connections from active inputs to the desired output, and decreasing the
      weights of the connections from active inputs to erroneous outputs. In the multilayered case,
      the machine first needs to learn that "special-case" or "exception" groupings exist; then it
      needs to learn which group activations contribute to or detract from which outputs; and,
      lastly, it needs to learn which inputs should merge into which groupings. If these groupings
      were hard-wired by human programmers, then the training problem reduced to that of the
      single-layer case &mdash; but it also defeated the purpose of having a machine that could
      learn patterns on its own. The challenge of how to get a machine to discover and assemble
      these groupings <em>by itself</em> remained unresolved.
    </p>
    <p>
      The answer finally came in 1986, when three researchers &mdash; psychologists
      <a href="https://en.wikipedia.org/wiki/David_Rumelhart"> David Rumelhart</a> and
      <a href="https://en.wikipedia.org/wiki/Geoffrey_Hinton"> Geoffrey Hinton</a> and computer
      scientist
      <a href="https://en.wikipedia.org/wiki/Ronald_J._Williams">Ronald J. Williams</a>
      &mdash; revealed an algorithm they called
      <a href="https://en.wikipedia.org/wiki/Backpropagation">"backpropagation"</a>. As its name
      suggests, the backpropagation algorithm involves assigning portions of an error signal, or
      "blame" for an incorrect result, incrementally across multiple chains of processing units
      backwards from output to input. This concept was not original to this trio; the operating
      principles of backpropagation stretch back at least to the work of aeronautics engineer
      <a href="https://en.wikipedia.org/wiki/Henry_J._Kelley">Henry J. Kelley</a> in 1960, and its
      earliest software implementation to mathematician
      <a href="https://en.wikipedia.org/wiki/Seppo_Linnainmaa">Seppo Linnainmaa</a> in 1970, with
      <a href="https://people.idsia.ch/~juergen/who-invented-backpropagation.html"
        >many contributors making many improvements</a
      >
      in subsequent years. However, this principle of backpropagation (which previously went by
      various different unwieldy names, such as "reverse accumulation in automatic differentiation")
      was intended for use in
      <a href="https://en.wikipedia.org/wiki/Control_theory">control theory</a>, primarily in the
      domain of aerospace engineering &mdash; <a :href="linkKelley1960">Kelley's original paper</a>,
      for example, demonstrated how to use the technique to compute an orbital transfer trajectory
      for a spacecraft flying via solar-sail propulsion. It had little to do with computer science.
      A few people had discussed the possibility of applying these ideas to the task of training
      multilayered perceptrons &mdash; most notably sociologist
      <a href="https://en.wikipedia.org/wiki/Paul_Werbos"> Paul Werbos </a>in his
      <a :href="linkBeyondRegressionPDF">1974 dissertation for his Ph.D. in statistics.</a>
      But Rumelhart, Hinton, and Williams were the first to
      <a :href="linkHinton1986">experimentally demonstrate it</a>. Computer scientist
      <a href="http://yann.lecun.com/ex/research/index.html">Yann LeCun</a>, in 1987, produced
      significant refinements both to the implementation and to the theoretical framework for using
      backpropagation in this manner. It is from this work that the technology we now call "neural
      networks" took shape.
    </p>
    <p style="color: #888">
      If you''d like to see how backpropagation works on a conceptual level, I recommend you start
      with
      <a href="https://www.youtube.com/watch?v=Ilg3gGewQ5U"
        >this excellent video series by 3Blue1Brown</a
      >
      (no affiliation). If you have some programming expertise and want to understand how to turn
      the equations into code,
      <a href="https://neptune.ai/blog/backpropagation-algorithm-in-neural-networks-guide"
        >Neptune.ai (no affiliation) has a detailed lesson.</a
      >
    </p>
    <p>
      Though these developments in the mid to late 1980s breathed new life into the study of neural
      networks, they didn't end the AI winter. The equations of backpropagation are extremely
      complex both for computers and for most humans, requiring the solving of partial derivatives
      in arbitrarily high-dimensional hyperspaces. Rumelhart et. al. had found a solution to the
      problem of training multilayered perceptrons, but the solution required tremendous computing
      power in order to do anything useful. Interest in neural networks rose again in the 1990s,
      only to dwindle back down again in the 2000s when little commercial application could be found
      due to extremely slow and error-prone real-world performance. Tasks such as real-time speech
      or image recognition were far beyond the processing capabilities of consumer-grade hardware
      &mdash; and offloading neural network operations to data centers was infeasible because, with
      broadband still uncommon and cellphones still primarily being voice communication devices with
      limited data capabilities, the network infrastructure for cloud computing didn't exist at the
      time. During this period, neural networks were generally regarded as laboratory tools, useful
      for exploratory analysis and investigation rather than end-goal solutions &mdash; for example,
      a hedge fund might run a large neural network on a supercomputer to identify a trading pattern
      for some set of stocks, but then the hedge fund would build an expert system to actually
      perform live trades using the pattern. In the apocryphal words of researcher
      <a href="https://math.illinoisstate.edu/actuary/downloads/ClintonAboagye-PinnacleU-2021.pptx"
        >John S. Denker from around 1994</a
      >, "A neural network is the second best way to solve any problem. The best way is to actually
      understand the problem."
    </p>
    <p>
      It's long been known that
      <a href="https://en.wikipedia.org/wiki/Moore%27s_law">
        computing power grows on an exponential trend</a
      >, so it was arguably inevitable that backpropagation-trained neural networks would become
      more viable for bigger problems over time. However, two noteworthy developments accelerated
      the timetable considerably.
    </p>

    <div class="explando-photo explando-photo-right">
      <a
        href="https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/"
      >
        <img src="@/assets/img/ReLU-vs-logistic-Sigmoid.png" />
      </a>
      <div class="caption">
        The logistic sigmoid function (a functionm commonly used for neuronal activation prior to
        2011), compared to ReLU. (Image courtesy of ResearchGate)
      </div>
    </div>

    <p>
      One was the adoption of the
      <a href="https://en.wikipedia.org/wiki/Rectifier_(neural_networks)"
        >ReLU activation function</a
      >
      &mdash; a tiny technical detail with enormous implications. For multilayered perceptrons to be
      able to solve linearly inseparable problems, the activity level of each neuron can't simply be
      the sum of its inputs. The "activation function" is the function that converts the neuron's
      input summation into an activity level. Since the adoption of backpropagation, neural networks
      have tended to use activation functions that come from backprop's roots in control theory
      &mdash; which tend to be extremely complex trigonometric or inverse-exponential functions
      requiring floating-point computation to many digits of precision. Not only were these
      functions costly both in memory and in CPU cycles, they were also
      <a
        href="https://www.analyticsvidhya.com/blog/2021/06/the-challenge-of-vanishing-exploding-gradients-in-deep-neural-networks/"
        >rather poor at doing their only job</a
      >: propagating corrective signals iteratively up a chain of neural layers. In 2011,
      <a :href="linkReLUPDF">researchers at the University of Montréal</a> showed that a
      ridiculously simple formula called the
      <a href="https://www.mygreatlearning.com/blog/relu-activation-function/">
        Rectified Linear Unit, or ReLU</a
      >, solved all of the propagation problems of more conventional activation functions, while
      <em>also</em> requiring much less precision (i.e. less memory) <em>and</em> being dramatically
      easier to compute. (The ReLU function is literally just this: "Set the neuron's activity level
      to the sum of its inputs; but if it drops to negative, floor it out at 0.") The ReLU function
      isn't "mathematically pure" for the purposes of usage in backpropagation (specifically, it has
      a point, x=0, at which it's nondifferentiable), and as such, though it had been known about
      since 1960, it had often been overlooked for use in neural networks. However, the Montréal
      team's results were undeniable, and the use of ReLU for Deep Learning has been nearly
      ubiquitous ever since.
    </p>
    <p>
      The other major advancement was a hardware innovation that had been growing for decades, and
      finally came to fruition in 2007. That was the year that NVIDIA, the company that produces a
      significant share of the world's graphics cards, released
      <a href="https://en.wikipedia.org/wiki/CUDA"
        >the Compute Unified Device Architecture, or CUDA</a
      >, a framework for developing general-purpose software to run directly on graphics processors.
      Driven almost entirely by the demands of the video game industry,
      <a href="https://www.investopedia.com/terms/g/graphics-processing-unit-gpu.asp"
        >Graphics Processing Units, or GPUs</a
      >, have evolved into astonishingly powerful workhorses for massively parallel mathematical
      operations. The equations that drive the rendering of visually realistic environments largely
      describe the rotation, scaling, and translation of points in space, and these equations can be
      expressed in terms of linear algebra &mdash; that is, vector and matrix (or "tensor")
      multiplication, addition, and unit-wise summation ("reduction"). Thus, GPUs aren't good at
      performing general-purpose mathematical operations, but they excel at executing incredibly
      large tensor operations at blinding speeds. As it so happens, almost every equation involved
      in the running and training of neural networks can be expressed as a tensor operation. (In
      fact, the only part of neural networks that <em>can't</em> be expressed with linear algebra
      is, as described above, the activation function &mdash; which the Montréal team optimized!)
      Unsurprisingly, the migration of all neural network research to GPUs began almost immediately.
    </p>
    <p>
      Unfortunately, CUDA also allowed massive parallelization for another computationally expensive
      task: cryptography. And
      <a href="https://money.usnews.com/investing/articles/the-history-of-bitcoin"
        >with Bitcoin launching in 2009</a
      >
      followed by <a href="https://en.wikipedia.org/wiki/Ethereum">Ethereum in 2015</a>, it wasn't
      long before
      <a
        href="https://www.reddit.com/r/nvidia/comments/n6i8hq/an_attempt_to_quantify_how_many_gpus_are_out/"
        >the world's supply of GPUs was being primarily directed towards crypto mining</a
      >
      &mdash; not gaming, and certainly not AI research.
    </p>

    <div class="explando-photo explando-photo-left">
      <a
        href="https://www.digitalinformationworld.com/2023/01/chat-gpt-achieved-one-million-users-in.html"
      >
        <img src="@/assets/img/statista-chatgpt-1M-5d.jpg" />
      </a>
      <div class="caption">
        Counting from the day it launched, ChatGPT reached a million registered users in five days.
        The closest speed of mass adoption was achieved by Instagram, which took 2.5 months to reach
        the one-million user mark. (Image courtesy of Statista)
      </div>
    </div>

    <p>
      Though the crypto market has crashed, computing technology is still not at the point at which
      individual consumers can afford to run their own Large Language Model rigs. The unprecedented
      popularity of ChatGPT &mdash; jumping to
      <a
        href="https://www.digitalinformationworld.com/2023/01/chat-gpt-achieved-one-million-users-in.html"
      >
        a million active users in a mere five days</a
      >, is due primarily to the uncannily (some would say <em>terrifyingly</em>) high quality of
      its output. And that quality, in turn, is due primarily to the sheer size of its neural
      network components. Its famed 175 billion neural connection weights (called "parameters" for
      reasons of mathematical nomenclature) need over
      <a href="https://www.hyro.ai/glossary/gpt-3">700 GB of RAM just to load into memory</a>.
      <a href="https://hackernoon.com/a-deep-dive-into-how-many-gpus-it-takes-to-run-chatgpt">
        One analyst estimates</a
      >
      that the servers running each instance of ChatGPT probably have between 5 to 8 GPUs apiece,
      which would cost a private consumer tens of thousands of dollars &mdash; achievable, but only
      for either the very dedicated or the very wealthy (these kinds of servers are sold
      <a href="https://www.gigabyte.com/Enterprise/GPU-Server?fid=2235"
        >on the kinds of websites that don't list prices</a
      >). Nonetheless, this would only permit real-time interaction with an already-trained model.
      The <em>training</em> process for GPT-3 involved storing and processing over
      <a href="https://duradigital.io/building-the-future-an-overview-of-gpt-3/"
        >45 terabytes of text</a
      >
      (a volume of data that would take over a month of continuous downloading to transfer over the
      average home broadband connection) and burning
      <a href="https://medium.com/@mertsurucu/analyses-of-gpt-3-paper-a9e478c3d7e7">
        as much electricity as an average American home uses in the course of 18 years (190,000
        kWh)</a
      >. The day when the average consumer can carry around their very own personal learning-enabled
      GPT instance in their pockets isn't around the corner.
    </p>
    <p>But it's not <em>far off</em>, either.</p>

    <p>
      The feedforward multilayer perceptron design, with backpropagation as its training algorithm,
      remains the overwhelmingly dominant neural network architecture to this day, and its
      capabilities continue to improve at an exponential rate. As you read these words, somewhere at
      this moment there are
      <a href="https://ai.googleblog.com/2020/04/chip-design-with-deep-reinforcement.html">
        hardware engineers using neural networks to design the next generation of computing
        technology</a
      >, and
      <a
        href="https://www.zdnet.com/article/chatgpt-can-write-code-now-researchers-say-its-good-at-fixing-bugs-too/"
      >
        software developers using ChatGPT to help them code the next breakthrough in machine
        learning algorithms</a
      >. Software toolkits such as Google's
      <a href="https://www.tensorflow.org/">TensorFlow library</a> and rentable cloud computing
      environments such as Amazon's <a href="https://aws.amazon.com/sagemaker/">AWS Sagemaker</a>
      allow aspiring Machine Learning programmers to quickly and easily get started with building
      their own neural networks without needing a prerequisite doctorate, thus bringing millions of
      new creative minds to the field of AI research. Frank Rosenblatt's prophecy that his analog
      contraption would be the "embryo" of sentient machinery may yet come to fruition &mdash; and
      soon.
    </p>
  </div>
</template>

<style scoped lang="scss">
.explando-essay-component {
  .explando-photo {
    margin: 1em 3em 1em;

    &.explando-photo-right {
      float: right;
      margin-right: 0;
    }

    &.explando-photo-left {
      float: left;
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
}
</style>
