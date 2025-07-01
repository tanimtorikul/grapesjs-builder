import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';

const CustomBuilder = () => {
  return (
    <div className='h-screen'>

<StudioEditor
  options={{
    // ...
    plugins: [
      editor => {
        editor.Components.addType('custom-view', {
          model: {
            defaults: {
              tagName: 'section',
              droppable: false,
              attributes: { title: 'Section title' },
              components: '<div>Content from model</div>',
              traits: [{
                name: 'title',
                label: 'Update title'
              }]
            }
          },
          view: {
            // Use custom tagName, which overrides the one provided by the model
            tagName: 'div',
    
            // Add DOM event listeners
            events: () => ({
              dblclick: 'onActive',
              // Add event listeners to inner elements
              'click img': 'changeWithRandomImage'
            }),
    
            // Called once the Component View instance is created
            init() {
              // Listen to model events
              this.listenTo(this.model, 'change:attributes:title', this.updateImageWithTitle);
            },
    
            // Called on component attributes update (eg. new attribute added from the model)
            onAttrUpdate() {
              this.el.style.cssText = 'border: 5px solid #8b5cf6;';
            },
    
            // Called when the element is rendered.
            onRender() {
              const { el } = this;
              const imageStyle = 'display: block; margin: 0 auto; width: 150px; height: 150px; cursor: help;';
              el.innerHTML = `
                <ul>
                  <li>Double-click anywhere on the element to open the Asset Manager</li>
                  <li>Click on the image to change it with a random one</li>
                  <li>Update the image by changing the component title</li>
                </ul>
                <img style="${imageStyle}" src="${this.getImageWithTitle()}" />
              `;
            },
    
            // Called when the element is removed from the canvas.
            // Useful to cleanup global event listeners or other resources.
            removed() {
              console.log('Element removed');
            },
    
            onActive() {
              editor.Assets.open({
                select: asset => {
                  const imageEl = this.el.querySelector('img');
                  imageEl?.setAttribute('src', asset.getSrc());
                }
              });
            },
    
            changeWithRandomImage() {
              const imageEl = this.el.querySelector('img');
              const randomImage = `https://picsum.photos/seed/random-${Math.random()}/150`;
              imageEl?.setAttribute('src', randomImage);
            },
    
            updateImageWithTitle() {
              const imageEl = this.el.querySelector('img');
              imageEl?.setAttribute('src', this.getImageWithTitle());
            },
    
            getImageWithTitle() {
              const modelAttrs = this.model.getAttributes();
              return `https://placehold.co/150/777/white.png?text=${modelAttrs.title}`;
            }
          }
        });
      }
    ],
    project: {
      default: {
        assets: Array(100).fill(0).map((_, i) => `https://picsum.photos/seed/${i}/200/200`),
        pages: [{
          name: 'Home',
          component: '<div data-gjs-type="custom-view"></div>'
        }]
      }
    },
    // Custom editor layout for demo purpose
    layout: {/**/}
  }}
/>
    </div>
  )
}

export default CustomBuilder